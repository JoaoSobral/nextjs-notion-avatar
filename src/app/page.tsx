/*
MIT License

Original project: https://github.com/zonemeen/react-notion-avatar (c) 2021 zonemeen and contributors.
This fork and update: (c) 2025 Joao Pedro Goncalves: https://github.com/JoaoSobral/nextjs-notion-avatar
*/
'use client';

import React, { useState, useEffect } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import classnames from 'classnames';
import { useTranslation } from '../utils/useTranslation';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FlaskConical } from 'lucide-react';

import NotionAvatar from '../package';
import { getRandomConfig } from '../package/utils';
import type { AvatarConfig, AvatarPart, ShapeTypes } from '../package/types';

import Header from '../components/Header';
import AvatarEditor from '../components/AvatarEditor';
import Footer from '../components/Footer';

/**
 * Main page for the Notion Avatar Editor app.
 *
 * This page renders the avatar editor, header, and footer, and manages the
 * avatar configuration state, background color, shape, and language.
 *
 * :returns: The main application page as a React component.
 */
export default function Home() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [config, setConfig] = useState<AvatarConfig | null>(null);
  const [shape, setShape] = useState<ShapeTypes>('circle');
  const [bgColor, setBgColor] = useState('#f5eee6');
  const [flipped, setFlipped] = useState(false);
  const [language, setLanguage] = useState(locale);

  useEffect(() => {
    setConfig(getRandomConfig() as AvatarConfig);
  }, []);

  /**
   * Handles language change for the app.
   *
   * :param language: The new language code to set.
   */
  const onChangeLanguage = (language: string) => {
    setLanguage(language);
    // Change locale by navigating to the same path with new locale
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = language;
    router.push('/' + segments.join('/'));
  };

  /**
   * Updates the avatar configuration for a given part.
   *
   * :param key: The avatar part to update.
   * :param value: The new value for the part.
   */
  const updateConfig = (key: AvatarPart, value: number) => {
    if (!config) return;
    config[key] = value;
    setConfig({ ...config });
  };

  /**
   * Sets a random avatar configuration.
   */
  const getRandomStyle = () => {
    setConfig(getRandomConfig() as AvatarConfig);
  };

  /**
   * Triggers a confetti celebration animation.
   */
  const celebrate = () => {
    const defaults = {
      colors: ['#5D8C7B', '#F2D091', '#F2A679', '#D9695F', '#8C4646'],
      shapes: ['square'],
      ticks: 500,
    } as confetti.Options;
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 100,
      origin: { y: 0 },
    });
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
      });
    }, 250);
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
      });
    }, 400);
  };

  /**
   * Downloads the current avatar as a PNG image.
   */
  const downloadAvatar = async () => {
    celebrate();
    const scale = 2;
    const node = document.getElementById('notionAvatar');
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${node.offsetWidth / 2 / scale}px, ${node.offsetHeight / 2 / scale}px)`,
          'border-radius': 0,
        },
        width: node.offsetWidth * scale,
      });
      saveAs(blob, 'notion-avatar.png');
    }
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div id="notionAvatar" className="pb-32">
          {config && (
            <NotionAvatar
              className={classnames('w-64 h-64 highres:w-80 highres:h-80', {
                flip: flipped,
              })}
              shape={shape}
              bgColor={bgColor}
              config={config}
            />
          )}
        </div>
        <div>
          {config && (
            <AvatarEditor
              config={config}
              bgColor={bgColor}
              shape={shape}
              flipped={flipped}
              updateConfig={updateConfig}
              setShape={setShape}
              setBgColor={setBgColor}
              setFlipped={setFlipped}
              downloadAvatar={downloadAvatar}
              getRandomStyle={getRandomStyle}
            />
          )}
        </div>
      </main>
      {/* Test Components Button */}
      <div className="flex justify-center mt-8 mb-4">
        <Link href="/templates" passHref legacyBehavior>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-lg"
            style={{ letterSpacing: '0.01em' }}
            aria-label="Test Avatar Generators"
          >
            <FlaskConical className="w-6 h-6" />
            Test the Avatar Components (for your website)
          </a>
        </Link>
      </div>
      <Footer language={language} onLanguageChange={onChangeLanguage} />
      <div className="gradient-bg">
        <div className="gradient-top" />
        <div className="gradient-bottom" />
      </div>
    </div>
  );
}
