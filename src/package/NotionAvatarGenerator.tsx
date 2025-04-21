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
 * - actionButtonProps: Optional props to override style/className for action buttons (Cancel, Generate Random, Save).
 *   Accepts: { className?: string, style?: React.CSSProperties, ...styleProps } (see below)
 *   Style-only props (borderRadius, background, color, width, fontSize, fontWeight, padding) are only applied via the style prop and are not passed as DOM attributes.
 * - cancelLabel: Optional string to override the Cancel button label.
 * - randomLabel: Optional string to override the Generate Random button label.
 * - saveLabel: Optional string to override the Save button label.
 *
 * Usage:
 * ------
 * import { NotionAvatarGenerator } from 'nextjs-notion-avatar';
 *
 * <NotionAvatarGenerator onCancel={...} onRandom={...} onSave={...} actionButtonProps={{ background: '#222', color: '#fff', className: 'my-custom-class' }} />
 */
import React, { useState, useEffect } from 'react';
import NotionAvatar from './';
import { getRandomConfig } from './utils';
import type { AvatarConfig, AvatarPart } from './types';
import { Button } from './ui/button';
import { Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import './notion-avatar-generator.css';

// Avatar part SVGs/components
import Accessory from './accessory';
import Beard from './beard';
import Detail from './detail';
import Eye from './eye';
import Eyebrow from './eyebrow';
import Face from './face';
import Glass from './glass';
import Hair from './hair';
import Mouth from './mouth';
import Nose from './nose';

interface NotionAvatarGeneratorProps {
  onCancel?: () => void;
  onRandom?: (configString: string) => void;
  onSave?: (configString: string) => void;
  actionButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: string;
    background?: string;
    width?: string | number;
    fontSize?: string | number;
    fontWeight?: string | number;
    borderRadius?: string | number;
    padding?: string;
  };
  cancelLabel?: string;
  randomLabel?: string;
  saveLabel?: string;
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

export function NotionAvatarGenerator({ onCancel, onRandom, onSave, actionButtonProps, cancelLabel, randomLabel, saveLabel }: NotionAvatarGeneratorProps) {
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

  // Style override for action buttons
  const actionBtnStyle = {
    ...(actionButtonProps?.style || {}),
    color: actionButtonProps?.color || undefined,
    background: actionButtonProps?.background || undefined,
    width: actionButtonProps?.width || undefined,
    fontSize: actionButtonProps?.fontSize || undefined,
    fontWeight: actionButtonProps?.fontWeight || undefined,
    borderRadius: actionButtonProps?.borderRadius || undefined,
    padding: actionButtonProps?.padding || undefined,
  };

  // Remove style-only props from being spread on the button
  const {
    color,
    background,
    width,
    fontSize,
    fontWeight,
    borderRadius,
    padding,
    style,
    ...buttonPropsRest
  } = actionButtonProps || {};

  return (
    <div className="navg-container">
      {/* Centered Avatar */}
      <div className="navg-avatar">
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
      <div className="navg-selector-row">
        {config && avatarParts.map(({ key, label, Comp }) => (
          <div key={key} className="navg-selector">
            <button
              className="navg-btn"
              onClick={() => handlePartClick(key)}
              aria-label={key}
              type="button"
            >
              <span style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 1080 1080" width="28" height="28" fill="black">
                  <Comp type={config[key]} />
                </svg>
              </span>
            </button>
            <span className="navg-label">{label}</span>
          </div>
        ))}
        {/* Color Picker */}
        <div className="navg-selector" style={{ position: 'relative' }}>
          <button
            className="navg-btn"
            onClick={() => setShowColorPicker((v) => !v)}
            aria-label="background"
            type="button"
          >
            <Palette className="w-6 h-6" fill={bgColor === '#fff' ? 'black' : 'white'} />
          </button>
          <span className="navg-label">Colour</span>
          {showColorPicker && (
            <div className="navg-color-picker">
              <HexColorPicker color={bgColor} onChange={setBgColor} />
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="navg-actions">
        <button
          className={`navg-action-btn${actionButtonProps?.className ? ' ' + actionButtonProps.className : ''}`}
          style={actionBtnStyle}
          {...buttonPropsRest}
          onClick={handleCancel}
        >
          {cancelLabel || 'Cancel'}
        </button>
        <button
          className={`navg-action-btn${actionButtonProps?.className ? ' ' + actionButtonProps.className : ''}`}
          style={actionBtnStyle}
          {...buttonPropsRest}
          onClick={handleRandom}
        >
          {randomLabel || 'Generate'}
        </button>
        <button
          className={`navg-action-btn${actionButtonProps?.className ? ' ' + actionButtonProps.className : ''}`}
          style={actionBtnStyle}
          {...buttonPropsRest}
          onClick={handleSave}
        >
          {saveLabel || 'Save'}
        </button>
      </div>
    </div>
  );
} 