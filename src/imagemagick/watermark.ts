import { main, File as mFile } from 'magica'
import initMuPdf from "mupdf-js"

import { angleSize, ImageSpecs, WatermarkRequest } from './utils'

async function fileToPng(file: File, options: WatermarkRequest): Promise<mFile[]> {
  const start = Date.now()
  if (file.name.substr(file.name.lastIndexOf('.') + 1) === 'pdf') {
    const pdf = await initMuPdf()
    const doc = pdf.load(new Uint8Array(await file.arrayBuffer()))
    const pages = pdf.countPages(doc)

    const files: mFile[] = []
    for (let i = 1 ; i <= pages ; i++) {
      const png = pdf.drawPageAsPNG(doc, i, options.dpi || 180)
      files.push(new mFile(`page-${i}.png`, Buffer.from(png.replace('data:image/png;base64,', ''), 'base64')))
    }
    const end = Date.now()
    console.log(`muPDF took ${(end-start).toFixed(0)}ms`)
    return files
  }
  return [new mFile(file.name, new Uint8ClampedArray(await file.arrayBuffer()))]
}

function parseIdentify(line: string): ImageSpecs {
  const r = /([\d]+)x([\d]+) /
  const g = r.exec(line)
  if (!g || g.length !== 3) {
    return {
      width: 0,
      height: 0
    }
  }

  return {
    width: parseInt(g[1]),
    height: parseInt(g[2])
  }
}

async function watermarkFile(file: File, options: WatermarkRequest) {
  const watermarkedPngs: mFile[] = []

  const pngs = await fileToPng(file, options)
  for (const png of pngs) {
    const id = await main({
      inputFiles: [png],
      command: ['identify', png.name]
    })
    
    const specs = parseIdentify(id.stdout[0])
    const a = angleSize(specs, options)

    const result = await main({
      inputFiles: ['arial.ttf', png],
      command: [
        'convert',
        '-size', `${specs.width}x${specs.height}`,
        '-font', 'arial.ttf',
        '-fill', options.color,
        '-pointsize', a.pointSize.toFixed(2),
        '-gravity', options.position,
        '-annotate', a.angle.toFixed(2), options.text.join('\n'),
        png.name,
        'out.png'
      ]
    })
    watermarkedPngs.push(...(result.outputFiles).map(f => new mFile(png.name, f.content)))
  }

  const p = await main({
    inputFiles: watermarkedPngs,
    command: ['convert', ...watermarkedPngs.map(png => png.name), file.name]
  })
  console.log(p)

  if (options.outputFormat === 'pdf') {
    const d = (`data:application/pdf;base64,${_arrayBufferToBase64(Buffer.from(p.outputFiles[0].content))}`)
    var a = document.createElement("a")
    a.href = d
    a.download = file.name
    a.click()
  }
}

async function watermarkAll (files: File[], options: WatermarkRequest) {
  const start = Date.now()
  for (const file of files) {
    await watermarkFile(file, options)
  }

  const end = Date.now()
  console.log(`This task took ${(end-start).toFixed(0)}ms`)
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

export { watermarkAll, watermarkFile }