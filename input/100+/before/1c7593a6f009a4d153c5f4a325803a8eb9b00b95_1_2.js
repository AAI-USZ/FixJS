function (factory) {
    var x, y, shape;

    return {
      beginDrawing: function (startX, startY) {
        x = startX;
        y = startY;
        shape = factory.build(
          WHITEBOARD.createDimensions(startX, startY, 0, 0)
        );
      },

      resize: function (right, bottom) {
        var side = Math.max(right - x, bottom - y);
        shape.destroy();
        shape = factory.build(
          WHITEBOARD.createDimensions(x, y, side, side)
        );
      }
    };
  }