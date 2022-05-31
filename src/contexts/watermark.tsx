import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

interface Watermark {
  text: string[]
  outputFormat: 'pdf' | 'jpg'
  dpi?: number
  position: 'Center'
  color: 'rgba(0,0,0,0.4)'
  resize: '100%'
  align: 'dia1' | 'dia2' | 'ttb' | 'btt' | 'ltr' | 'rtl'
}

const defaultWatermark: Watermark = {
  text: ['Watermark'],
  outputFormat: 'pdf',
  dpi: 180,
  position: 'Center',
  color: 'rgba(0,0,0,0.4)',
  resize: '100%',
  align: 'dia1'
}

const WatermarkContext = createContext<[Watermark, Dispatch<SetStateAction<Watermark>>]>([defaultWatermark, () => {}])

export const WatermarkContextProvider = (props: any) => {
  const [watermark, setWatermark] = useState<Watermark>(defaultWatermark)

  return (
    <WatermarkContext.Provider value={[watermark, setWatermark]}>
      {props.children}
    </WatermarkContext.Provider>
  )
}

export { WatermarkContext }