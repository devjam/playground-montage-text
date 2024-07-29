import { Leva, useControls } from 'leva'
import React from 'react'
import { isMobile } from 'react-device-detect'

const MontageText: React.FC = () => {
  const { text, type, split, duration, delay, fx, evenFix } = useControls({
    text: 'Montage',
    type: {
      value: 'skew',
      options: ['skew', 'translate'],
    },
    split: { value: 3, min: 1, max: 100, step: 1 },
    duration: { value: 6, min: 0.1, max: 20, step: 0.1 },
    delay: { value: 200, min: 0, max: 1000, step: 10 },
    fx: { value: [10, 20], min: 0, max: 180, step: 1 },
    evenFix: { value: false },
  })

  const clipPath = (index: number) => {
    const step = 100 / split
    const offset = step * index
    return `polygon(0% ${offset}%, 100% ${offset}%, 100% ${offset + step}%, 0% ${offset + step}%)`
  }

  return (
    <>
      <Leva
        hideCopyButton={true}
        collapsed={isMobile}
        titleBar={isMobile ? { position: { x: 10, y: -10 } } : true}
        theme={
          isMobile
            ? {
                sizes: {
                  titleBarHeight: '30px',
                },
              }
            : {}
        }
      />
      <div className="flex h-screen w-screen items-center justify-center leading-none">
        {Array.from({ length: split }).map((_, index) => (
          <div
            key={index}
            className={`absolute font-bold uppercase ease-in-out`}
            style={
              {
                fontSize: `min(${100 / text.length}vw, 130px)`,
                clipPath: clipPath(index),
                animationName: `montage-${type}`,
                animationDuration: `${duration}s`,
                animationDelay: `${index * delay}ms`,
                animationIterationCount: 'infinite',
                '--montage':
                  (Math.random() * (fx[1] - fx[0]) + fx[0]) *
                  (index % 2 === 0 ? (evenFix ? 0 : -1) : 1),
              } as React.CSSProperties
            }
          >
            {text}
          </div>
        ))}
      </div>
    </>
  )
}
export default MontageText
