import React, { useState, useEffect } from 'react';
import NotionAvatar from '../../';
import { getRandomConfig } from '../../utils';
import type { AvatarConfig } from '../../types';
import { Button } from '../../ui/button';
import { Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import './simple-avatar-generator.css';

interface SimpleAvatarGeneratorProps {
  onCancel?: () => void;
  onRandom?: (config: AvatarConfig, bgColor: string) => void;
  onSave?: (config: AvatarConfig, bgColor: string) => void;
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
  avatarSize?: string;
}

export function SimpleAvatarGenerator({
  onCancel,
  onRandom,
  onSave,
  actionButtonProps,
  cancelLabel,
  randomLabel,
  saveLabel,
  avatarSize
}: SimpleAvatarGeneratorProps) {
  const [config, setConfig] = useState<AvatarConfig | null>(null);
  const [bgColor, setBgColor] = useState<string>('#f5eee6');
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (config === null) {
      setConfig(getRandomConfig() as AvatarConfig);
    }
  }, [config]);

  const handleRandom = () => {
    const randomConfig = getRandomConfig() as AvatarConfig;
    setConfig(randomConfig);
    if (onRandom) {
      onRandom(randomConfig, bgColor);
    }
  };

  const handleSave = () => {
    if (!config) return;
    if (onSave) {
      onSave(config, bgColor);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

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
      <div className="navg-avatar" style={avatarSize ? { maxWidth: avatarSize, maxHeight: avatarSize } : undefined}>
        {config ? (
          <NotionAvatar
            config={config}
            shape="circle"
            bgColor={bgColor}
          />
        ) : (
          <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400">Loading...</div>
        )}
      </div>
      {/* Only Color Picker */}
      <div className="navg-selector-row">
        <div className="navg-selector" style={{ position: 'relative' }}>
          <button
            className="navg-btn"
            onClick={() => setShowColorPicker((v) => !v)}
            aria-label="background"
            type="button"
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Color swatch behind the icon */}
            <span
              style={{
                position: 'absolute',
                width: '1.6rem',
                height: '1.6rem',
                borderRadius: '50%',
                background: bgColor,
                border: '2px solid #ccc',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                boxSizing: 'border-box',
              }}
            />
            <Palette
              className="w-6 h-6"
              style={{ position: 'relative', zIndex: 1 }}
              fill={bgColor === '#fff' ? 'black' : 'white'}
            />
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