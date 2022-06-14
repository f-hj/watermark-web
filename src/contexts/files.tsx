import { FormatListNumberedTwoTone } from '@material-ui/icons'
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { watermarkFile } from '../imagemagick/watermark'
import { WatermarkContext } from './watermark'

const FilesContext = createContext<{
  files: WatermarkingFile[],
  setFiles: (files: WatermarkingFile[]) => void,
  currentFile: number,
  process: () => void,
  loading: boolean,
  reset: () => void,
}>({
  files: [],
  setFiles: (files: WatermarkingFile[]) => {},
  currentFile: -1,
  process: () => {},
  loading: false,
  reset: () => {},
})

export interface WatermarkingFile {
  file: File
  watermarked?: ArrayBufferView
  error?: string
}

export const FilesContextProvider = (props: any) => {
  const [w] = useContext(WatermarkContext)
  
  const [files, setFiles] = useState<WatermarkingFile[]>([])
  const [currentFile, setCurrentFile] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)

  const process = async () => {
    for (const file of files) {
      setLoading(true)
      setCurrentFile((n) => n + 1)
      try {
        const watermarked = await watermarkFile(file.file, w)
        setFiles((currentFiles) => currentFiles.map(f => f.file.name === file.file.name ? { ...f, watermarked } : f))
      } catch (e: any) {
        setFiles((currentFiles) => currentFiles.map(f => f.file.name === file.file.name ? { ...f, error: e.message } : f))
      }
      setLoading(false)
    }
  }

  const reset = () => {
    setFiles([])
    setCurrentFile(-1)
    setLoading(false)
  }

  return (
    <FilesContext.Provider value={{ files, setFiles, currentFile, process, reset, loading }}>
      {props.children}
    </FilesContext.Provider>
  )
}

export { FilesContext }