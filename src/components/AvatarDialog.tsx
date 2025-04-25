"use client";

import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { NotionAvatarGenerator } from '../package/NotionAvatarGenerator';
import type { AvatarConfig, ShapeTypes } from '../package/types';
import NotionAvatar from '../package';

/**
 * Example component showing how to use NotionAvatarGenerator in a page
 */
export default function AvatarDialog() {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState<{
    config: AvatarConfig | null;
    shape: ShapeTypes;
    bgColor: string;
  }>({
    config: null,
    shape: 'circle',
    bgColor: '#ffffff'
  });

  const handleSave = (config: AvatarConfig, shape: ShapeTypes, bgColor: string) => {
    setAvatar({ config, shape, bgColor });
    // Here you could also call an API to save the avatar configuration
    console.log('Avatar config saved:', { config, shape, bgColor });
  };
  
  return (
    <div className="p-8 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">Notion Avatar Generator</h1>
      
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)}>
          {avatar.config ? 'Edit Avatar' : 'Create Avatar'}
        </Button>
        
        {avatar.config && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div 
              className="rounded-lg p-4" 
              style={{ backgroundColor: avatar.bgColor }}
            >
              <NotionAvatar 
                className="w-48 h-48" 
                config={avatar.config} 
                shape={avatar.shape} 
                bgColor={avatar.bgColor} 
              />
            </div>
            
            <pre className="mt-4 p-4 bg-muted rounded-md overflow-auto max-w-md">
              <code>
                {JSON.stringify(avatar, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </div>
      
      <NotionAvatarGenerator 
      />
    </div>
  );
} 