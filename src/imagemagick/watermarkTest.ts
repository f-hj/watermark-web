import { main } from 'magica'
import { angleSize, ImageSpecs, WatermarkRequest } from './utils'

const sizeFor = (type: 'A4'): ImageSpecs => {
  return {
    width: 210,
    height: 297
  }
}

const watermarkTest = async (type: 'A4', options: WatermarkRequest) => {
  console.log('run test')
  const size = sizeFor(type)
  const a = angleSize(size, options)
  console.log(a)

  const args = []
  args.push('convert')
  args.push('-size')
  args.push(`${size.width}x${size.height}`)
  args.push('canvas:white')
  args.push('-interlace')
  args.push('none')
  args.push('-density')
  args.push('100')
  args.push('-font')
  args.push('arial.ttf')
  if (a.pointSize !== Infinity) {
    args.push('-fill')
    args.push(options.color)  // color of watermark text
    args.push('-pointsize')
    args.push(a.pointSize.toFixed(0)) // this needs to be calculated dynamically based on image size and length of copyright message
    args.push('-gravity')
    args.push(options.position)    // alignment of watermark text.
    args.push('-annotate')
    args.push(a.angle.toFixed(0))   // angle of watermark message, with respect to X-axis
    args.push(options.text.join('\n'))
  }
  args.push('out.png')
  console.log(args.join(' '))

  const result = await main({
    inputFiles: ['arial.ttf'],
    //command: 'convert -font arial.ttf -pointsize 44 -background lightblue -fill navy label:Seba out.png'
    command: args
  })

  console.log(result)
  return `data:image/png;base64,${btoa(String.fromCharCode(...Buffer.from(result.outputFiles[0].content)))}`
}

export {watermarkTest}