#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Batch convert SVG string JS files from @parts to TypeScript React components in @package.
 *
 * - Traverses each relevant subfolder in @parts (accessory, eye, mouth, hair, face)
 * - For each .js file, extracts the SVG string, and creates a .tsx React function component in the corresponding @package subfolder, with the next available incremented filename
 * - Each component matches the style of accessory/13.tsx (function component, Sphinx-style block comment, default export)
 * - Updates the index.tsx in each subfolder to import and switch on the new components
 * - Uses fs/promises and path modules
 * - Prints a summary of actions at the end
 * - Supports a dry-run option via CLI flag
 */

const PARTS_DIR = path.resolve(
  __dirname,
  '../../Downloads/avartation-api-master 2/src/parts'
);
const PACKAGE_DIR = path.resolve(
  __dirname,
  '../src/package'
);
const SUBFOLDERS = ['accessory', 'eye', 'mouth', 'hair', 'face'];
const DRY_RUN = process.argv.includes('--dry-run');

function toComponentName(subfolder: string, idx: number): string {
  // Capitalize subfolder, e.g. Accessory, Eye, etc.
  return `${subfolder.charAt(0).toUpperCase() + subfolder.slice(1)}${idx}`;
}

function svgStringToJSX(svgString: string): string {
  // Remove backticks and newlines, keep indentation
  let jsx = svgString.replace(/^`|`$/g, '').replace(/\r?\n/g, '\n');
  // Replace double quotes with double quotes (for JSX)
  jsx = jsx.replace(/"/g, '"');
  // Remove any leading/trailing whitespace
  return jsx.trim();
}

async function getNextIndex(pkgDir: string): Promise<number> {
  const files = await fs.readdir(pkgDir);
  const nums = files
    .map(f => f.match(/^(\d+)\.tsx$/))
    .filter(Boolean)
    .map(m => m ? parseInt(m[1], 10) : 0);
  return nums.length ? Math.max(...nums) + 1 : 0;
}

async function processSubfolder(subfolder: string): Promise<any> {
  const srcDir = path.join(PARTS_DIR, subfolder);
  const destDir = path.join(PACKAGE_DIR, subfolder);
  const indexFile = path.join(destDir, 'index.tsx');
  let created: { file: string; compName: string }[] = [];

  try {
    const srcFiles = (await fs.readdir(srcDir)).filter(f => f.endsWith('.js'));
    let nextIdx = await getNextIndex(destDir);
    for (const file of srcFiles) {
      const destFile = path.join(destDir, `${nextIdx}.tsx`);
      try {
        await fs.access(destFile);
        // File already exists, skip
        nextIdx++;
        continue;
      } catch {
        // File does not exist, proceed
      }
      const content = await fs.readFile(path.join(srcDir, file), 'utf8');
      const svgMatch = content.match(/=\s*`([\s\S]+?)`;/);
      if (!svgMatch) continue;
      const svg = svgMatch[1];
      const compName = toComponentName(subfolder, nextIdx);
      const tsx = `import React from 'react'\n\n/**\n * ${compName} component.\n *\n * @returns {JSX.Element} The SVG ${subfolder}.\n */\nfunction ${compName}() {\n  return (\n    ${svgStringToJSX('`' + svg + '`')}\n  )\n}\n\nexport default ${compName}\n`;
      if (!DRY_RUN) {
        await fs.writeFile(destFile, tsx, 'utf8');
      }
      created.push({ file: `${nextIdx}.tsx`, compName });
      nextIdx++;
    }
    // Update index.tsx
    if (created.length) {
      let indexContent = await fs.readFile(indexFile, 'utf8');
      // Add imports
      for (const { file, compName } of created) {
        if (!indexContent.includes(`import ${compName} from './${file.replace('.tsx', '')}'`)) {
          indexContent = indexContent.replace(
            /(import [^;]+;\n)+/,
            match => match + `import ${compName} from './${file.replace('.tsx', '')}'\n`
          );
        }
      }
      // Add switch cases
      indexContent = indexContent.replace(
        /(switch \(type\) \{[\s\S]+?)(default: \{[\s\S]+?\})/,
        (match, start, def) => {
          const cases = created
            .map(({ file, compName }) => `    case ${file.replace('.tsx', '')}: {\n      return <${compName} />\n    }\n`)
            .join('');
          return start + cases + def;
        }
      );
      if (!DRY_RUN) {
        await fs.writeFile(indexFile, indexContent, 'utf8');
      }
    }
    return { subfolder, created };
  } catch (err: any) {
    console.error(`Error processing ${subfolder}:`, err);
    return { subfolder, created: [], error: err };
  }
}

(async () => {
  console.log(`Batch converting @parts to @package...`);
  let summary: any[] = [];
  for (const subfolder of SUBFOLDERS) {
    const result = await processSubfolder(subfolder);
    summary.push(result);
    if (result.created.length) {
      console.log(`  ${subfolder}: created ${result.created.length} new components.`);
    }
  }
  console.log('\nSummary:');
  for (const { subfolder, created, error } of summary) {
    if (error) {
      console.log(`  ${subfolder}: ERROR (${(error && error.message) || error})`);
    } else {
      console.log(`  ${subfolder}: ${created.length} new components.`);
    }
  }
  if (DRY_RUN) {
    console.log('\n(DRY RUN: No files were written)');
  }
})(); 