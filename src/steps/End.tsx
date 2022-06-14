import { Button, Chip, Tooltip } from "@material-ui/core"
import { useContext } from "react"
import { FilesContext } from "../contexts/files"
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import GetAppIcon from '@material-ui/icons/GetApp'
import { WatermarkStep, WatermarkStepContext } from "../contexts/step"

function End() {
  const [step, setStep] = useContext(WatermarkStepContext)
  const { files, reset } = useContext(FilesContext)
  
  return <>
    {
      files.map(file => {
        if (!file.watermarked) {
          return <>
            <Tooltip title={file.error ?? 'Unknown error'} aria-label="add">
              <Chip icon={<ErrorOutlineIcon />} key={file.file.name} label={file.file.name} />
            </Tooltip>
            <br />
          </>
        }
        return <>
          <Chip icon={<GetAppIcon />} label={file.file.name} onClick={() => {
            const d = (`data:application/pdf;base64,${_arrayBufferToBase64(Buffer.from(file.watermarked!))}`)
            var a = document.createElement("a")
            a.href = d
            a.download = file.file.name
            a.click()
          }} />
          <br />
        </>
      })
    }
    <Button onClick={() => {
      reset()
      setStep(WatermarkStep.SelectWatermark)
    }}>Start again</Button>
  </>
}

function _arrayBufferToBase64( buffer: Buffer ): string {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

export default End