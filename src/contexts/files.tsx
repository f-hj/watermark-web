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
}>({
  files: [],
  setFiles: (files: WatermarkingFile[]) => {},
  currentFile: -1,
  process: () => {},
  loading: false,
})

export interface WatermarkingFile {
  file: File
  watermarked?: ArrayBufferView
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
      const watermarked = await watermarkFile(file.file, w)
      setFiles((currentFiles) => currentFiles.map(f => f.file.name === file.file.name ? { ...f, watermarked } : f))
      setLoading(false)
    }
  }

  return (
    <FilesContext.Provider value={{ files, setFiles, currentFile, process, loading }}>
      {props.children}
    </FilesContext.Provider>
  )
}

export { FilesContext }