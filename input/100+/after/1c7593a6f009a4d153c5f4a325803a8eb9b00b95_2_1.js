function (x, y, width, height) {
    var inverseX = width < 0,
      inverseY = height < 0,
      realX = inverseX ? x + width : x,
      realY = inverseY ? y + height : y,
      self = Object.create({}, {
        x: {
          value: realX,
          enumerable: true
        },
        y: {
          value: realY,
          enumerable: true
        },
        width: {
          value: inverseX ? -width : width,
          enumerable: true
        },
        height: {
          value: inverseY ? -height : height,
          enumerable: true
        },
        equals: {
          value: function (other) {
            return this.x === other.x && this.y === other.y &&
              this.width === other.width && this.height === other.height;
          }
        },
        toString: {
          value: function () {
            return [
              ['x: ' + x], ['y: ' + y], [width, height].join('x')
            ].join(', ');
          }
        }
      });
    return self;
  }