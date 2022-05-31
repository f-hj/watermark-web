import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

const FilesContext = createContext<[File[], Dispatch<SetStateAction<File[]>>]>([[], () => {}])

export const FilesContextProvider = (props: any) => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <FilesContext.Provider value={[files, setFiles]}>
      {props.children}
    </FilesContext.Provider>
  )
}

export { FilesContext }