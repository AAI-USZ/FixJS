function(event) {
        var newDirection;
        newDirection = _this.direction;
        switch (event.keyCode) {
          case 37:
            newDirection = 'left';
            break;
          case 38:
            newDirection = 'up';
            break;
          case 39:
            newDirection = 'right';
            break;
          case 40:
            newDirection = 'down';
        }
        if (!_this._isOpposite(newDirection)) {
          _this.direction = newDirection;
          return _this.moves.enqueue(_this._nextPosition(_this.moves.back()));
        }
      }