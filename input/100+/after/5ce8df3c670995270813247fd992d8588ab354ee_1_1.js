function (e, target) {
      var action = 'drag',
          corner,
          pointer = getPointer(e);

      if (corner = target._findTargetCorner(e, this._offset)) {
        action = (corner === 'ml' || corner === 'mr')
          ? 'scaleX'
          : (corner === 'mt' || corner === 'mb')
            ? 'scaleY'
            : corner === 'mtr'
              ? 'rotate'
              : (target.hasRotatingPoint)
                ? 'scale'
                : 'rotate';
      }

      this._currentTransform = {
        target: target,
        action: action,
        scaleX: target.scaleX,
        scaleY: target.scaleY,
        offsetX: pointer.x - target.left,
        offsetY: pointer.y - target.top,
        ex: pointer.x,
        ey: pointer.y,
        left: target.left,
        top: target.top,
        theta: target.theta,
        width: target.width * target.scaleX
      };

      this._currentTransform.original = {
        left: target.left,
        top: target.top
      };
    }