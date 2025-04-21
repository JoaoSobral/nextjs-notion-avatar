'use client';

import React, { useState } from 'react';
import { NotionAvatarGenerator } from '../../package/NotionAvatarGenerator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Test page for demonstrating the NotionAvatarGenerator component.
 *
 * :returns: The test page as a React component.
 */
export default function TestPage() {
  const [show, setShow] = useState(true);
  const [lastAction, setLastAction] = useState('');

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-[800px] mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to main page</span>
          </Link>
        </div>
        <div className="rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">NotionAvatarGenerator Demo</h1>
          {show && (
            <NotionAvatarGenerator
              onCancel={() => {
                setShow(false);
                setLastAction('Cancelled');
              }}
              onRandom={(configString) => {
                setLastAction('Random: ' + configString);
              }}
              onSave={(configString) => {
                setLastAction('Saved: ' + configString);
              }}
            />
          )}
          {!show && (
            <button
              className="mt-8 px-4 py-2 bg-black text-white rounded"
              onClick={() => setShow(true)}
            >
              Show Avatar Generator
            </button>
          )}
          {lastAction && (
            <div className="mt-6 p-4 bg-gray-100 text-black rounded">
              <strong>Last action:</strong> {lastAction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 