/*
MIT License

Original project: https://github.com/zonemeen/react-notion-avatar (c) 2021 zonemeen and contributors.
This fork and update: (c) 2025 Joao Pedro Goncalves: https://github.com/JoaoSobral/nextjs-notion-avatar
*/
import React from 'react'
import { ShapeBorderRadius } from './const'
import Accessory from './accessory'
import Beard from './beard/index'
import Detail from './detail/index'
import Eye from './eye/index'
import Eyebrow from './eyebrow/index'
import Face from './face/index'
import Glass from './glass/index'
import Hair from './hair/index'
import Mouth from './mouth/index'
import Nose from './nose/index'
import { NotionAvatarProps } from './types'

const NotionAvatar: React.FC<NotionAvatarProps> = (props) => {
  const { className, style, shape = 'circle', bgColor, config } = props
  const {
    face,
    eye,
    eyebrow,
    glass,
    hair,
    mouth,
    nose,
    accessory,
    beard,
    detail,
  } = config
  const borderRadius = ShapeBorderRadius[shape]
  return (
    <div
      className={className}
      style={{
        backgroundColor:
          shape in ShapeBorderRadius ? bgColor : 'rgba(255, 0, 0, 0)',
        overflow: 'hidden',
        borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <svg
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <Face type={face} />
        <Eye type={eye} />
        <Eyebrow type={eyebrow} />
        <Glass type={glass} />
        <Hair type={hair} />
        <Mouth type={mouth} />
        <Nose type={nose} />
        <Accessory type={accessory} />
        <Beard type={beard} />
        <Detail type={detail} />
      </svg>
    </div>
  )
}

export default NotionAvatar

export { getRandomConfig } from './utils'

export * from './types'

export { NotionAvatarGenerator } from './components/complex_avatar/NotionAvatarGenerator'

export { default as SectionWrapper } from './SectionWrapper'
