'use client';

import React, { useState } from 'react';
import { NotionAvatarGenerator } from '../../package/components/complex_avatar/NotionAvatarGenerator';
import { SimpleAvatarGenerator } from '../../package/components/simple_avatar/SimpleAvatarGenerator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Demo page for both NotionAvatarGenerator (complex) and SimpleAvatarGenerator (simple).
 *
 * :returns: The demo page as a React component.
 */
export default function TemplatePage() {
  const [showComplex, setShowComplex] = useState(true);
  const [showSimple, setShowSimple] = useState(true);
  const [lastActionComplex, setLastActionComplex] = useState('');
  const [lastActionSimple, setLastActionSimple] = useState('');

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to main page</span>
          </Link>
        </div>
        <div className="rounded-lg p-8 bg-white/5 shadow-lg">
          <h1 className="text-3xl font-bold mb-10 text-center">Avatar Generator Demos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Complex Avatar Generator */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Full Notion Avatar Generator</h2>
              {showComplex && (
                <NotionAvatarGenerator
                  onCancel={() => {
                    setShowComplex(false);
                    setLastActionComplex('Cancelled');
                  }}
                  onRandom={(config, bgColor) => {
                    setLastActionComplex('Random: ' + JSON.stringify(config) + ', bgColor: ' + bgColor);
                  }}
                  onSave={(config, bgColor) => {
                    setLastActionComplex('Saved: ' + JSON.stringify(config) + ', bgColor: ' + bgColor);
                  }}
                />
              )}
              {!showComplex && (
                <button
                  className="mt-8 px-4 py-2 bg-black text-white rounded"
                  onClick={() => setShowComplex(true)}
                >
                  Show Complex Generator
                </button>
              )}
              {lastActionComplex && (
                <div className="mt-6 p-4 bg-gray-100 text-black rounded w-full" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                  <strong>Last action:</strong> {lastActionComplex}
                </div>
              )}
            </div>
            {/* Simple Avatar Generator */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Simple Avatar Generator</h2>
              {showSimple && (
                <SimpleAvatarGenerator
                  onCancel={() => {
                    setShowSimple(false);
                    setLastActionSimple('Cancelled');
                  }}
                  onRandom={(config, bgColor) => {
                    setLastActionSimple('Random: ' + JSON.stringify(config) + ', bgColor: ' + bgColor);
                  }}
                  onSave={(config, bgColor) => {
                    setLastActionSimple('Saved: ' + JSON.stringify(config) + ', bgColor: ' + bgColor);
                  }}
                />
              )}
              {!showSimple && (
                <button
                  className="mt-8 px-4 py-2 bg-black text-white rounded"
                  onClick={() => setShowSimple(true)}
                >
                  Show Simple Generator
                </button>
              )}
              {lastActionSimple && (
                <div className="mt-6 p-4 bg-gray-100 text-black rounded w-full" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                  <strong>Last action:</strong> {lastActionSimple}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 