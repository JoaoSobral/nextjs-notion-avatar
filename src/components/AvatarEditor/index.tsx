/*
MIT License

Original project: https://github.com/zonemeen/react-notion-avatar (c) 2021 zonemeen and contributors.
This fork and update: (c) 2025 Joao Pedro Goncalves: https://github.com/JoaoSobral/nextjs-notion-avatar
*/
import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { HexColorPicker } from 'react-colorful'
import type { AvatarConfig, AvatarPart, ShapeTypes } from '../../package/types'
import { useTranslation } from '../../utils/useTranslation'

import Accessory from '../../package/accessory'
import Beard from '../../package/beard/index'
import Detail from '../../package/detail/index'
import Eye from '../../package/eye/index'
import Eyebrow from '../../package/eyebrow/index'
import Face from '../../package/face/index'
import Glass from '../../package/glass/index'
import Hair from '../../package/hair/index'
import Mouth from '../../package/mouth/index'
import Nose from '../../package/nose/index'

import SectionWrapper from '../../package/SectionWrapper'
import { AvatarConfigCount } from '../../package/const'
import './index.scss'
import { copyTextToClipboard } from '../../utils/copy'

interface EditorProps {
  config: AvatarConfig
  bgColor: string
  shape: ShapeTypes
  flipped: boolean
  updateConfig: (type: AvatarPart, value: number) => void
  setShape: (shape: ShapeTypes) => void
  setBgColor: (newColor: string) => void
  downloadAvatar: () => void
  getRandomStyle: () => void
  setFlipped: (flipped: boolean) => void
}

/**
 * AvatarEditor component for the Notion Avatar Editor app.
 *
 * Allows users to customize the avatar by selecting parts, colors, and shape.
 *
 * :param config: The current avatar configuration.
 * :param bgColor: The background color for the avatar.
 * :param shape: The shape of the avatar.
 * :param flipped: Whether the avatar is flipped.
 * :param updateConfig: Function to update avatar part configuration.
 * :param setShape: Function to set the avatar shape.
 * :param setBgColor: Function to set the background color.
 * :param downloadAvatar: Function to download the avatar image.
 * :param getRandomStyle: Function to randomize the avatar style.
 * :param setFlipped: Function to set the flipped state.
 * :returns: The avatar editor as a React functional component.
 */
const AvatarEditor: React.FC<EditorProps> = ({
  config,
  bgColor,
  shape,
  flipped,
  updateConfig,
  setShape,
  setBgColor,
  downloadAvatar,
  getRandomStyle,
  setFlipped,
}) => {
  const { t } = useTranslation()
  const shapes = ['circle', 'rounded', 'square']
  const [isCodeShow, setIsCodeShow] = useState(false)
  const [isPaletteShow, setIsPaletteShow] = useState(false)
  const [copied, setCopied] = React.useState(false)
  const paletteRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const switchConfig = (type: AvatarPart, currentIdx: number) => {
    const optLength = AvatarConfigCount[type]
    const newIdx = (currentIdx + 1) % optLength
    updateConfig(type, newIdx)
  }
  const switchShape = (currentShape: ShapeTypes) => {
    const currentIdx = shapes.findIndex((item) => item === currentShape)
    const newIdx = (currentIdx + 1) % shapes.length
    setShape(shapes[newIdx] as ShapeTypes)
  }
  const genCodeString = (config: AvatarConfig) => {
    const myConfig = Object.keys(config).reduce(
      (acc, key) => ({ ...acc, [key]: config[key as AvatarPart] }),
      {}
    )
    return (
      'const config = ' +
      JSON.stringify(myConfig, null, 2) +
      '\n' +
      `<NotionAvatar style={{ width: '5rem', height: '5rem' }} bgColor="${bgColor}" shape="${shape}" config={config} />`
    )
  }
  /**
   * Handles clicks outside the palette or code block to close them.
   *
   * :param event: The mouse event.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node) &&
        codeRef.current &&
        !codeRef.current.contains(event.target as Node)
      ) {
        setIsPaletteShow(false)
        setIsCodeShow(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className="AvatarEditor rounded-full px-3 py-2 flex items-center">
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Face')}
        switchConfig={() => switchConfig('face', config.face)}
      >
        <Face type={config.face} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Eye')}
        switchConfig={() => switchConfig('eye', config.eye)}
      >
        <Eye type={config.eye} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Eyebrow')}
        switchConfig={() => switchConfig('eyebrow', config.eyebrow)}
      >
        <Eyebrow type={config.eyebrow} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Glass')}
        switchConfig={() => switchConfig('glass', config.glass)}
      >
        <Glass type={config.glass} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Hair')}
        switchConfig={() => switchConfig('hair', config.hair)}
      >
        <Hair type={config.hair} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Mouth')}
        switchConfig={() => switchConfig('mouth', config.mouth)}
      >
        <Mouth type={config.mouth} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Nose')}
        switchConfig={() => switchConfig('nose', config.nose)}
      >
        <Nose type={config.nose} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Beard')}
        switchConfig={() => switchConfig('beard', config.beard)}
      >
        <Beard type={config.beard} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Accessory')}
        switchConfig={() => switchConfig('accessory', config.accessory)}
      >
        <Accessory type={config.accessory} />
      </SectionWrapper>
      <SectionWrapper
        isSvgElement={true}
        className="w-12 h-12 rounded-full p-2 mx-2"
        tip={t('tip.Detail')}
        switchConfig={() => switchConfig('detail', config.detail)}
      >
        <Detail type={config.detail} />
      </SectionWrapper>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <div
        className="iconfont mx-2 cursor-pointer transition duration-300 flex items-center justify-center"
        data-tip={t('tip.Shape')}
        onClick={() => switchShape(shape as ShapeTypes)}
        style={{ width: '3rem', height: '3rem' }}
      >
        <div
          className={classnames('w-4 h-4 bg-black', {
            'rounded-full': shape === 'circle',
            rounded: shape === 'rounded',
          })}
        />
      </div>
      <div
        className="iconfont mx-2 cursor-pointer transition duration-300"
        data-tip={t('tip.Flip')}
        onClick={() => setFlipped(!flipped)}
      >
        <svg viewBox="0 0 1024 1024" width="22" height="22">
          <path
            d="M159.530667 810.666667H362.666667a21.333333 21.333333 0 0 0 21.333333-21.333334V281.429333a21.333333 21.333333 0 0 0-41.130667-7.893333L139.690667 781.397333A21.333333 21.333333 0 0 0 159.573333 810.666667z"
            fill={flipped ? '#000000' : '#ffffff'}
            opacity="0.8"
          />
          <path
            d="M864.469333 810.666667H661.333333a21.333333 21.333333 0 0 1-21.333333-21.333334V281.429333a21.333333 21.333333 0 0 1 41.130667-7.893333l203.178666 507.861333a21.333333 21.333333 0 0 1-19.84 29.269334z"
            fill={flipped ? '#ffffff' : '#000000'}
            opacity="0.8"
          />
          <path
            d="M469.333333 85.333333m42.666667 0l0 0q42.666667 0 42.666667 42.666667l0 768q0 42.666667-42.666667 42.666667l0 0q-42.666667 0-42.666667-42.666667l0-768q0-42.666667 42.666667-42.666667Z"
            fill="#ffffff"
            opacity="0.2"
          />
        </svg>
      </div>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <div className="relative flex justify-center">
        <i
          className="iconfont icon-Palette text-xl mx-2 cursor-pointer transition duration-300 opacity-80"
          data-tip={t('tip.Palette')}
          onClick={(e) => {
            e.stopPropagation()
            setIsPaletteShow(!isPaletteShow)
          }}
        />
        {isPaletteShow && (
          <div
            ref={paletteRef}
            className={classnames('absolute bottom-full mb-4', {
              active: isPaletteShow,
            })}
            onClick={(e) => {
              e.stopPropagation()
              setIsPaletteShow(true)
            }}
          >
            <HexColorPicker
              color={bgColor}
              onChange={(newColor) => setBgColor(newColor)}
            />
          </div>
        )}
      </div>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <i
        className="iconfont icon-dice-d-solid text-xl mx-2 cursor-pointer transition duration-300 opacity-80"
        data-tip={t('tip.Random')}
        onClick={getRandomStyle}
      />
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <div className="mx-2 relative flex justify-center">
        <i
          className={classnames(
            'iconfont icon-code text-xl cursor-pointer transition duration-300 opacity-80',
            {
              banTip: isCodeShow,
            }
          )}
          data-tip={t('tip.Config')}
          onClick={(e) => {
            e.stopPropagation()
            setIsCodeShow(!isCodeShow)
          }}
        />
        {isCodeShow && (
          <div
            ref={codeRef}
            className={classnames(
              'rounded-lg bg-white p-5 absolute bottom-full codeBlock mb-4 active',
            )}
            onClick={(e) => {
              e.stopPropagation()
              setIsCodeShow(true)
            }}
          >
            <pre className="flex flex-wrap text-xs w-80 overFlow highres:text-sm">
              {genCodeString(config)}
            </pre>
            <button
              onClick={() => {
                copyTextToClipboard(genCodeString(config))
                setCopied(true)
                setTimeout(() => {
                  setCopied(false)
                }, 2000)
              }}
              className={classnames(
                'bg-gray-400 absolute text-black top-4 right-4 rounded-lg px-2 py-1 text-xs inline-flex items-center active:bg-blue-500 active:text-white',
                {
                  'text-blue-600': copied,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              <span className="ml-1">{copied ? t('Copied') : t('Copy')}</span>
            </button>
          </div>
        )}
      </div>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <i
        className="iconfont icon-download text-xl mx-2 cursor-pointer transition duration-300 opacity-80"
        data-tip={t('tip.Download')}
        onClick={downloadAvatar}
      />
    </div>
  )
}

export default AvatarEditor
