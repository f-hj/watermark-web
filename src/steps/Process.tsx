import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { FilesContext } from '../contexts/files'
import { WatermarkContext } from '../contexts/watermark'
import { watermarkFile } from '../imagemagick/watermark'

function Process() {
  const [w] = useContext(WatermarkContext)
  const [files] = useContext(FilesContext)

  const [ loading, setLoading ] = useState<boolean>(false)
  const [ currentFile, setCurrentFile ] = useState<number>(-1)
  const process = async () => {
    setLoading(true)
    for (const file of files) {
      setCurrentFile((n) => n + 1)
      await watermarkFile(file, w)
    }
    setLoading(false)
  }

  if (loading) {
    return <>
      <CircularProgress variant="determinate" value={currentFile / files.length * 100} />
      <p>Loading...</p>
      <p>Current file: {currentFile}</p>
    </>
  }

  return <>
    <Typography variant="body2">You will convert {files.length} files</Typography>
    <Button onClick={() => {
      process()
    }}>Run</Button>
  </>
}

export default Process