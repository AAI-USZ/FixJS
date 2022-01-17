function (x, y, width, height) {
    var inverseX = width < 0,
      inverseY = height < 0,
      self = Object.create({}, {
        x: {
          value: inverseX ? x + width : x,
          enumerable: true
        },
        y: {
          value: inverseY ? y + height : y,
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