interface WatermarkRequest {
  text: string[]
  dpi?: number
  outputFormat: 'pdf' | 'jpg'
  position: 'Center'
  color: 'rgba(0,0,0,0.4)',
  resize: '100%',
  align: 'dia1' | 'dia2' | 'ttb' | 'btt' | 'ltr' | 'rtl'
}

interface ImageSpecs {
  width: number
  height: number
}

const angleSize = (imageData: ImageSpecs, options: {
  resize: string,
  text: string[],
  align: 'dia1' | 'dia2' | 'ttb' | 'btt' | 'ltr' | 'rtl'
}): {
  angle: number
  pointSize: number
} => {
  let width = imageData.width
  let height = imageData.height
  let resize = options.resize
  let pointWidth = width
  let pointHeight = height

  if (options.resize.toString().indexOf('%') === -1) {
    resize = '100%'
  } else {
    let resizeFactor = (parseFloat(resize) / 100)
    
    pointWidth = width * resizeFactor
    pointHeight = height * resizeFactor
  }
  const longestString: string = [...options.text].sort((a, b) => b.length - a.length)[0]

  switch(options.align) {
    case 'ltr'  :
      return {
        angle: 0,
        pointSize: (pointWidth / longestString.length)
      }
    case 'rtl'  : 
      return {
        angle: 180,
        pointSize: (pointWidth / longestString.length)
      }
    case 'ttb'  :
      return {
        angle: 90,
        pointSize: (pointHeight / longestString.length)
      }
    case 'btt':
      return {
        angle: 270,
        pointSize: (pointHeight / longestString.length)
      }
    case 'dia1':
      return {
        angle: (Math.atan(height / width) * (180/Math.PI)) * -1,
        pointSize: Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / longestString.length
      }
    case 'dia2':
      return {
        angle: (Math.atan(height / width) * (180/Math.PI)),
        pointSize: Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / longestString.length
      }
  }
}

/*function parseIdentify(input: string): ImageSpecs {
  
}*/

export { angleSize }
export type { ImageSpecs, WatermarkRequest }
