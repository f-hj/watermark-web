import { Button, LinearProgress, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { FilesContext } from '../contexts/files'
import { WatermarkStep, WatermarkStepContext } from '../contexts/step'

function Process() {
  const [step, setStep] = useContext(WatermarkStepContext)
  const [processing, setProcessing] = useState<boolean>(false)
  const { files, currentFile, process, loading } = useContext(FilesContext)

  useEffect(() => {
    if (processing) {
      return
    }
    setProcessing(true);

    (async () => {
      await process()
      setStep(step + 1)
    })()
  })

  if (loading) {
    return <>
      <LinearProgress variant="buffer" value={currentFile / files.length * 100} valueBuffer={(currentFile + 1) / files.length * 100} />
      <p>Loading...</p>
      <p>Current file: {currentFile}</p>
    </>
  }

  return <Typography>Oops</Typography>
}

export default Process