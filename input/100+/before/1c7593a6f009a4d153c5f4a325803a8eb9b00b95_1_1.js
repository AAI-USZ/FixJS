function (right, bottom) {
        var side = Math.max(right - x, bottom - y);
        shape.destroy();
        shape = factory.build(
          WHITEBOARD.createDimensions(x, y, side, side)
        );
      }