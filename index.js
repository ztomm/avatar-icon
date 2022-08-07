/*!
 * avatar-icon
 * Copyright(c) 2022 Murat Motz
 * MIT Licensed
 * https://github.com/ztomm/avatar-icon
 */

'use strict'

/**
 * Module dependencies
 * @private
 */

const { createCanvas } = require('canvas')

/**
 * Module variables
 * @private
 */

const moduleName = 'avatar-icon'

/**
 * Module
 */

module.exports = function (options = {}) {
  // options documented under https://github.com/ztomm/avatar-icon
  let size            = options.size            || 48   // px
  let density         = options.density         || 6    // amount of shapes
  let colorRange      = options.colorRange      || 12   // amount of different colors
  let brightness      = options.brightness      || 40   // make it bright: start at 40 from 255 colors
  let contrast        = options.contrast        || 50   // %, take similar colors
  let backgroundColor = options.backgroundColor || ''   // #hex or empty
  let fillRatio       = options.fillRatio       || 60   // %, let some white space
  let rectangleRatio  = options.rectangleRatio  || 60   // %, ratio of rectangles
  let triangleRatio   = options.triangleRatio   || 40   // %, ratio of triangles
  let circleRatio     = options.circleRatio     || 0    // %, ratio of circles
  let returnType      = options.returnType      || ''   // default dataURL || 'buffer'

  // canvas
  let canvas = createCanvas(size, size)
  let ctx = canvas.getContext('2d')
  if (backgroundColor !== '') {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // quarter canvas
  let quarterSize = size / 2
  density = density / 2
  let blockSize = quarterSize / density

  // data to draw
  let data = []

  // create colorset
  let rgba = []
  for (let i = 0; i < 3; i++)
    rgba.push(Math.round(Math.random() * (255 - brightness)) + brightness)
  let colors = []
  for (let i = 0; i < colorRange; i++)
    colors.push([
      Math.round(rgba[0] * (100 - (Math.random() * contrast)) / 100),
      Math.round(rgba[1] * (100 - (Math.random() * contrast)) / 100),
      Math.round(rgba[2] * (100 - (Math.random() * contrast)) / 100),
      1
    ])
  // fill up white space (%)
  for (let i = 0; i < (density - Math.round(density * (fillRatio / 100))); i++)
    colors.push([255, 255, 255, 0])

  // triangle (x, y, size, direction, reverse)
  let changeTriangelMatrix = Math.round(Math.random() * 1)
  let getTriangle = function (x, y, s, d, r) {
    let t = [
      [x + s, y + 0, x + 0, y + 0, x + 0, y + s],
      [x + s, y + s, x + s, y + 0, x + 0, y + 0],
      [x + 0, y + 0, x + 0, y + s, x + s, y + s],
      [x + 0, y + s, x + s, y + s, x + s, y + 0],
    ]
    if (changeTriangelMatrix)
      t = [t[2], t[3], t[0], t[1]]
    return r ? ([...t].reverse())[d] : t[d]
  }

  // create random data
  // loop rows
  for (let i = 0; i < density; i++) {
    // loop cols
    for (let j = 0; j < density; j++) {
      let c = colors[Math.floor(Math.random() * colors.length)]
      let style = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`
      let shape = ''
      let triangelReverse = Math.round(Math.random() * 1)
      let shapeRatioTotal = rectangleRatio + triangleRatio + circleRatio
      let shapeRatioRanges = [0, circleRatio, triangleRatio + circleRatio, shapeRatioTotal]
      let shapeType = Math.round(Math.random() * shapeRatioTotal)
      if (shapeType <= shapeRatioRanges[3])
        shape = 'rec'
      if (shapeType < shapeRatioRanges[2])
        shape = 'tri'
      if (shapeType < shapeRatioRanges[1])
        shape = 'arc'
      // loop mirrors
      for (let k = 0; k < 4; k++) {
        let ctxData = { style }
        let x = blockSize * j
        let y = blockSize * i
        if (k === 1) {
          x = size - blockSize - (blockSize * j)
        }
        if (k === 2) {
          y = size - blockSize - (blockSize * i)
        }
        if (k === 3) {
          x = size - blockSize - (blockSize * j)
          y = size - blockSize - (blockSize * i)
        }
        if (shape === 'rec') {
          ctxData.rect = [x, y, blockSize, blockSize]
        }
        if (shape === 'tri') {
          let t = getTriangle(x, y, blockSize, k, triangelReverse)
          ctxData.triangle = [t[0], t[1], t[2], t[3], t[4], t[5]]
        }
        if (shape === 'arc') {
          ctxData.arc = [x + (blockSize / 2), y + (blockSize / 2), blockSize / 2, 0, 2 * Math.PI]
        }
        data.push(ctxData);
      }
    }
  }

  // draw data
  for (let i = 0; i < data.length; i++) {
    ctx.fillStyle = data[i].style
    if (data[i].rect) {
      ctx.fillRect(data[i].rect[0], data[i].rect[1], data[i].rect[2], data[i].rect[3])
    }
    if (data[i].triangle) {
      ctx.beginPath()
      ctx.moveTo(data[i].triangle[0], data[i].triangle[1])
      ctx.lineTo(data[i].triangle[2], data[i].triangle[3])
      ctx.lineTo(data[i].triangle[4], data[i].triangle[5])
      ctx.closePath()
      ctx.fill()
    }
    if (data[i].arc) {
      ctx.beginPath()
      ctx.arc(data[i].arc[0], data[i].arc[1], data[i].arc[2], data[i].arc[3], data[i].arc[4])
      ctx.closePath()
      ctx.fill()
    }
  }

  if (returnType === 'buffer')
    return canvas.toBuffer('image/png')
  // write buffer to disk: fs.writeFileSync('./image.png', buffer)

  return canvas.toDataURL()
}
