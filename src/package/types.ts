import React from 'react'

export interface TypeProps {
  type: number
}

type Style = {
  [key: string]: string | number | boolean
}

export interface AvatarConfig {
  face: number
  eye: number
  eyebrow: number
  glass: number
  hair: number
  mouth: number
  nose: number
  accessory: number
  beard: number
  detail: number
}

export type ShapeTypes = 'circle' | 'rounded' | 'square'

export interface NotionAvatarProps {
  className?: string
  style?: React.CSSProperties
  shape?: 'circle' | 'square' | 'rounded'
  bgColor?: string
  config: AvatarConfig
}

export interface NotionAvatarGeneratorProps {
  onCancel?: () => void
  onRandom?: (config: AvatarConfig) => void
  onSave?: (config: AvatarConfig) => void
  actionButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: string
    background?: string
    width?: string | number
    fontSize?: string | number
    fontWeight?: string | number
    borderRadius?: string | number
    padding?: string
  }
  cancelLabel?: string
  randomLabel?: string
  saveLabel?: string
  avatarSize?: string
}

export type AvatarPart = keyof AvatarConfig

declare const getRandomConfig: () => AvatarConfig

declare const NotionAvatar: React.FC<NotionAvatarProps>
