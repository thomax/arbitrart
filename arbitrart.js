// Generated by CoffeeScript 1.3.2
(function() {

  this.draw = function(x) {
    var blue, canvas, canvasData, canvasHeight, canvasWidth, colorGrid, ctx, drawPixel, goingDown, green, mutateColor, nextColor, previousBlue, previousGreen, previousRed, red, rnd, updateCanvas, y, _i, _j;
    canvas = document.getElementById('the_canvas');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    ctx = canvas.getContext("2d");
    canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    previousRed = 120;
    previousGreen = 120;
    previousBlue = 120;
    goingDown = false;
    colorGrid = [];
    colorDiff = 4;

    drawPixel = function(x, y, r, g, b) {
      var index;
      index = (x + y * canvasWidth) * 4;
      canvasData.data[index + 0] = r;
      canvasData.data[index + 1] = g;
      canvasData.data[index + 2] = b;
      return canvasData.data[index + 3] = 255;
    };

    updateCanvas = function() {
      return ctx.putImageData(canvasData, 0, 0);
    };

    mutateColor = function(color) {
      while (rnd(100) < 50) {
        if (rnd(100) < 20) {
          goingDown = !goingDown;
        }
        if (goingDown) {
          color = color - colorDiff;
        } else {
          color = color + colorDiff;
        }
      }
      return color;
    };

    rnd = function(n) {
      return Math.floor(Math.random() * n);
    };

    nextColor = function(x, y, previousColor) {
      var color, left, up;
      if (y > 0) {
        up = colorGrid[y - 1][x];
      } else {
        up = previousColor;
      }
      if (x > 0) {
        left = colorGrid[y][x - 1];
      } else {
        left = previousColor;
      }
      color = mutateColor((up + left) / 2);
      colorGrid[y][x] = color;
      return color;
    };
    for (y = _i = 0; 0 <= canvasHeight ? _i <= canvasHeight : _i >= canvasHeight; y = 0 <= canvasHeight ? ++_i : --_i) {
      colorGrid[y] = [];
      for (x = _j = 0; 0 <= canvasWidth ? _j <= canvasWidth : _j >= canvasWidth; x = 0 <= canvasWidth ? ++_j : --_j) {
        red = nextColor(x, y, previousRed);
        green = nextColor(x, y, previousGreen);
        blue = nextColor(x, y, previousBlue);
        drawPixel(x, y, red, green, blue);
      }
    }
    return updateCanvas();
  };

}).call(this);
