

@draw = (x) ->
  canvas = document.getElementById('the_canvas');
  canvasWidth = canvas.width
  canvasHeight = canvas.height
  ctx = canvas.getContext("2d")
  canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  previousRed = 120
  previousGreen = 120
  previousBlue = 120
  goingDown = false

  colorGrid = []

  drawPixel = (x, y, r, g, b) ->
    index = (x + y * canvasWidth) * 4
    canvasData.data[index + 0] = r
    canvasData.data[index + 1] = g
    canvasData.data[index + 2] = b
    canvasData.data[index + 3] = 255 # let's not fiddle with alpha


  updateCanvas = () ->
    ctx.putImageData(canvasData, 0, 0)

  mutateColor = (color) ->
    while rnd(100) < 50
      if rnd(100) < 20
        goingDown = !goingDown
      if goingDown
        color = color-3
      else
        color = color+3
    color

  rnd = (n) ->
    Math.floor(Math.random()*n)

  nextColor = (x, y, previousColor) ->
    if y > 0
      up = colorGrid[y-1][x]
    else
      up = previousColor
    if x > 0
      left = colorGrid[y][x-1]
    else
      left = previousColor
    color = mutateColor((up + left) / 2) # todo: tweak this line next
    colorGrid[y][x] = color
    color


  for y in [0..canvasHeight]
    colorGrid[y] = []
    for x in [0..canvasWidth]
      red = nextColor(x, y, previousRed)
      green = nextColor(x, y, previousGreen)
      blue = nextColor(x, y, previousBlue)
      drawPixel(x, y, red, green, blue)

  updateCanvas()

