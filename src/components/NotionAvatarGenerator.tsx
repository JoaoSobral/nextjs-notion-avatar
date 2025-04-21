/**
 * NotionAvatarGenerator React Component
 * ====================================
 *
 * A fully-featured avatar generator for Notion-style avatars, designed for use in Next.js and React projects.
 *
 * Features:
 * - Interactive avatar part selection (face, eyes, hair, etc.)
 * - Color picker for background
 * - Random avatar generation
 * - Save/cancel actions with callback support
 * - SSR-safe (no hydration issues)
 *
 * Props:
 * ------
 * - onCancel: Optional function called when the Cancel button is pressed.
 * - onRandom: Optional function called with the config string when Generate Random is pressed.
 * - onSave: Optional function called with the config string when Save is pressed.
 *
 * Usage:
 * ------
 * import { NotionAvatarGenerator } from 'nextjs-notion-avatar';
 *
 * <NotionAvatarGenerator onCancel={...} onRandom={...} onSave={...} />
 */
import React, { useState, useEffect } from 'react';
import NotionAvatar from '../package';
import { getRandomConfig } from '../package/utils';
import type { AvatarConfig, AvatarPart } from '../package/types';
import { Button } from '../components/ui/button';
import { Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

// Avatar part SVGs/components
import Accessory from '../package/accessory';
import Beard from '../package/beard';
import Detail from '../package/detail';
import Eye from '../package/eye';
import Eyebrow from '../package/eyebrow';
import Face from '../package/face';
import Glass from '../package/glass';
import Hair from '../package/hair';
import Mouth from '../package/mouth';
import Nose from '../package/nose';

interface NotionAvatarGeneratorProps {
  onCancel?: () => void;
  onRandom?: (configString: string) => void;
  onSave?: (configString: string) => void;
}

const avatarParts: { key: AvatarPart; label: string; Comp: any }[] = [
  { key: 'face', label: 'Face', Comp: Face },
  { key: 'eye', label: 'Eyes', Comp: Eye },
  { key: 'eyebrow', label: 'Eyebrows', Comp: Eyebrow },
  { key: 'glass', label: 'Glasses', Comp: Glass },
  { key: 'hair', label: 'Hair', Comp: Hair },
  { key: 'mouth', label: 'Mouth', Comp: Mouth },
  { key: 'nose', label: 'Nose', Comp: Nose },
  { key: 'beard', label: 'Beard', Comp: Beard },
  { key: 'accessory', label: 'Accessories', Comp: Accessory },
  { key: 'detail', label: 'Details', Comp: Detail },
];

const partMax: Record<AvatarPart, number> = {
  face: 10,
  eye: 14,
  eyebrow: 14,
  mouth: 19,
  nose: 13,
  accessory: 13,
  beard: 16,
  glass: 12,
  hair: 37,
  detail: 13,
};

function configToString(config: AvatarConfig): string {
  return Object.entries(config)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ');
}

export function NotionAvatarGenerator({ onCancel, onRandom, onSave }: NotionAvatarGeneratorProps) {
  const [config, setConfig] = useState<AvatarConfig | null>(null);
  const [bgColor, setBgColor] = useState<string>('#fff');
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Set initial config only on client
  useEffect(() => {
    if (config === null) {
      setConfig(getRandomConfig() as AvatarConfig);
    }
  }, [config]);

  // For each part, cycle through its options
  const handlePartClick = (part: AvatarPart) => {
    if (!config) return;
    setConfig((prev) => ({
      ...prev!,
      [part]: (prev![part] + 1) % (partMax[part] + 1),
    }));
  };

  // Cancel calls onCancel if provided
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Generate random config
  const handleRandom = () => {
    const randomConfig = getRandomConfig() as AvatarConfig;
    setConfig(randomConfig);
    const configStr = configToString(randomConfig);
    if (onRandom) {
      onRandom(configStr);
    } else {
      alert(configStr);
    }
  };

  // Save outputs the config
  const handleSave = () => {
    if (!config) return;
    const configStr = configToString(config);
    if (onSave) {
      onSave(configStr);
    } else {
      alert(configStr);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      {/* Centered Avatar */}
      <div className="flex items-center justify-center mt-8 mb-4">
        {config ? (
          <NotionAvatar
            className="w-[200px] h-[200px]"
            config={config}
            shape="circle"
            bgColor={bgColor}
          />
        ) : (
          <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400">Loading...</div>
        )}
      </div>
      {/* Selector Row */}
      <div className="w-full flex items-end justify-center gap-2 mb-4">
        {config && avatarParts.map(({ key, label, Comp }) => (
          <div key={key} className="flex flex-col items-center justify-end w-14">
            <Button
              variant="ghost"
              className="rounded-full w-10 h-10 flex items-center justify-center p-0 hover:bg-gray-200 shadow-md"
              onClick={() => handlePartClick(key)}
              aria-label={key}
              type="button"
            >
              <span className="w-7 h-7 flex items-center justify-center">
                <svg viewBox="0 0 1080 1080" width="28" height="28" fill="black">
                  <Comp type={config[key]} />
                </svg>
              </span>
            </Button>
            <span className="text-xs text-gray-400 mt-1">{label}</span>
          </div>
        ))}
        {/* Color Picker */}
        <div className="flex flex-col items-center justify-end w-14 relative">
          <Button
            variant="ghost"
            className="rounded-full w-10 h-10 flex items-center justify-center p-0 shadow-md"
            onClick={() => setShowColorPicker((v) => !v)}
            aria-label="background"
            type="button"
          >
            <Palette className="w-6 h-6" fill={bgColor === '#fff' ? 'black' : 'white'} />
          </Button>
          <span className="text-xs text-gray-400 mt-1">Colour</span>
          {showColorPicker && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 bg-white p-2 rounded-lg shadow-lg border">
              <HexColorPicker color={bgColor} onChange={setBgColor} />
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="w-full flex items-center justify-center gap-8 pb-8">
        <Button
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={handleRandom}
        >
          Generate Random
        </Button>
        <Button
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
} 