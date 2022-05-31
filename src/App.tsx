import React, { useContext, useState } from 'react'
import './App.css'
import { Box, Button, Container, Paper, Step, StepLabel, Stepper, TextField } from '@material-ui/core'
import SelectWatermark from './steps/SelectWatermark'
import { WatermarkStep, WatermarkStepContext } from './contexts/step'
import SelectFiles from './steps/SelectFiles'
import Process from './steps/Process'

function App() {
  const [step, setStep] = useContext(WatermarkStepContext)

  return (
    <Box m={2}>
      <Container maxWidth="md">
        <Paper className="App" variant="outlined">
          <Stepper activeStep={step}>
            <Step completed={step > WatermarkStep.SelectWatermark}>
              <StepLabel>Select watermark</StepLabel>
            </Step>
            <Step completed={step > WatermarkStep.SelectFiles}>
              <StepLabel>Select files</StepLabel>
            </Step>
            <Step completed={step > WatermarkStep.Process}>
              <StepLabel>Process</StepLabel>
            </Step>
          </Stepper>

          <Box m={4}>
            {
              step === WatermarkStep.SelectWatermark ? 
                <SelectWatermark />
              : null
            }
            {
              step === WatermarkStep.SelectFiles ? 
                <SelectFiles />
              : null
            }
            {
              step === WatermarkStep.Process ? 
                <Process />
              : null
            }
          </Box>

        </Paper>
      </Container>
    </Box>
  )
}

export default App
