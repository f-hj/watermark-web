import { Button } from '@material-ui/core'
import { DropzoneArea, FileObject } from 'material-ui-dropzone'
import React, { useContext, useEffect, useState } from 'react'
import { FilesContext } from '../contexts/files'
import { WatermarkStepContext } from '../contexts/step'

function SelectFiles() {
  const [step, setStep] = useContext(WatermarkStepContext)
  const [files, setFiles] = useContext(FilesContext)

  return <>
    <DropzoneArea
      filesLimit={Infinity}
      maxFileSize={Infinity}
      showPreviews={true}
      showPreviewsInDropzone={false}
      useChipsForPreview
      previewGridProps={{container: { spacing: 1, direction: 'row' }}}
      //previewChipProps={{classes: { root: classes.previewChip } }}
      previewText=""
      onChange={(files: File[]) => {
        setFiles(files)
      }}
      showAlerts={false}
    />

    <Button onClick={() => {
      setStep(step - 1)
    }}>Back</Button>

    <Button onClick={() => {
      setStep(step + 1)
    }}>Next</Button>
  </>
}

export default SelectFiles