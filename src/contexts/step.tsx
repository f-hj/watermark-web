import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

enum WatermarkStep {
  SelectWatermark = 0,
  SelectFiles,
  Process,
  Finished,
}

const WatermarkStepContext = createContext<[WatermarkStep, Dispatch<SetStateAction<WatermarkStep>>]>([WatermarkStep.SelectWatermark, () => {}])

export const WatermarkStepContextProvider = (props: any) => {
  const [step, setStep] = useState<WatermarkStep>(WatermarkStep.SelectWatermark)

  return (
    <WatermarkStepContext.Provider value={[step, setStep]}>
      {props.children}
    </WatermarkStepContext.Provider>
  );
}

export { WatermarkStepContext, WatermarkStep }