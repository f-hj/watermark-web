import { Button, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import { PlusOne } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { WatermarkStepContext } from '../contexts/step'
import { WatermarkContext } from '../contexts/watermark'
import { watermarkTest } from '../imagemagick/watermarkTest'

function SelectWatermark() {
  const [step, setStep] = useContext(WatermarkStepContext)
  const [watermark, setWatermark] = useContext(WatermarkContext)
  const [blob, setBlob] = useState('')

  useEffect(() => {
    watermarkTest('A4', watermark).then(b => setBlob(b))
    console.log(watermark.text)
  }, [watermark])
  
  return <>
    <Grid container justify="space-between">
      <Grid item xs={8}>
        <FormGroup>
          <TextField multiline label="Text line" value={watermark.text.join('\n')} onChange={(evt) => {
            setWatermark({
              ...watermark,
              text: evt.target.value ? evt.target.value.split('\n') : ['']
            })
          }} />

          <FormControl>
            <FormHelperText>Output format</FormHelperText>
            <RadioGroup row value={watermark.outputFormat} onChange={(evt) => {
              setWatermark({
                ...watermark,
                outputFormat: evt.target.value as 'pdf' | 'jpg'
              })
            }}>
              <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
              <FormControlLabel value="jpg" control={<Radio />} label="JPG" />
            </RadioGroup>
          </FormControl>

          
        </FormGroup>

        <br /><br />
        <Typography variant="body2">Your files will stay on your system and won't be uploaded anywhere in the "cloud"</Typography>
      </Grid>

      <Grid item xs={4}>
        <img style={{ float: 'right', border: '1px solid rgba(0, 0, 0, 0.12)' }} src={blob} />
      </Grid>
    </Grid>

    <Button onClick={() => {
      setStep(step + 1)
    }}>Next</Button>
  </>
}

export default SelectWatermark