function (factory) {
    var originX, originY, shape;

    return {
      beginDrawing: function (x, y) {
        originX = x;
        originY = y;
        shape = factory.build(
          WHITEBOARD.createDimensions(x, y, 0, 0)
        );
      },

      resize: function (right, bottom) {
        var distanceEast = right - originX,
          distanceSouth = bottom - originY,
          distanceWest = -distanceEast,
          distanceNorth = -distanceSouth,
          northWest = distanceNorth > 0 && distanceWest > 0,
          furthestNorthWest = Math.min(distanceEast, distanceSouth),
          furthestSouthEast = Math.max(distanceEast, distanceSouth),
          southWest = distanceWest > 0 && distanceSouth > 0,
          northEast = distanceNorth > 0 && distanceEast > 0,
          westSouthWest = southWest && distanceWest > distanceSouth,
          southSouthWest = southWest && distanceSouth > distanceWest,
          northNorthEast = northEast && distanceNorth > distanceEast,
          resizeTo = function (x, y) {
            if (!y) {
              y = x;
            }
            shape.destroy();
            shape = factory.build(
              WHITEBOARD.createDimensions(originX, originY, x, y)
            );
          };

        if (northWest) {
          resizeTo(furthestNorthWest);
        } else if (westSouthWest) {
          resizeTo(distanceEast, distanceWest);
        } else if (southSouthWest) {
          resizeTo(distanceNorth, distanceSouth);
        } else if (southWest) {
          resizeTo(distanceSouth, distanceNorth);
        } else if (northNorthEast) {
          resizeTo(distanceNorth, distanceSouth);
        } else if (northEast) {
          resizeTo(distanceEast, distanceWest);
        } else {
          resizeTo(furthestSouthEast);
        }
      }
    };
  }