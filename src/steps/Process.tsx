import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { FilesContext } from '../contexts/files'
import { WatermarkStepContext } from '../contexts/step'

function Process() {
  const [step, setStep] = useContext(WatermarkStepContext)
  const { files, currentFile, process, loading } = useContext(FilesContext)

  if (loading) {
    return <>
      <CircularProgress variant="determinate" value={currentFile / files.length * 100} />
      <p>Loading...</p>
      <p>Current file: {currentFile}</p>
    </>
  }

  return <>
    <Typography variant="body2">You will convert {files.length} files</Typography>
    <Button onClick={async () => {
      await process()
      setStep(step + 1)
    }}>Run</Button>
  </>
}

export default Process