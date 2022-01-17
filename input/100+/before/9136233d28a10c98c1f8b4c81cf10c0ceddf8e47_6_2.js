function() {
      var index, moveTo, piece, temp, _i, _len, _ref1, _results;
      if (!this.direction) {
        return;
      }
      if (this.grid.squareHasType('food', this.head)) {
        this.toGrow += this.growthPerFood;
        this.eating = true;
      }
      if (this.eating) {
        this._eat();
      }
      temp = this.head.clone();
      this.head = this.moves.isEmpty() ? this._nextPosition() : this.moves.dequeue();
      moveTo = this.head.clone();
      this.lastTailPos = this.chain[this.chain.length - 1].clone();
      if (this.grid.squareHasType('snake', moveTo)) {
        this.grid.restart();
      }
      _ref1 = this.chain;
      _results = [];
      for (index = _i = 0, _len = _ref1.length; _i < _len; index = ++_i) {
        piece = _ref1[index];
        this.grid.moveSquare(piece, moveTo, 'snake');
        piece.copy(moveTo);
        moveTo.copy(temp);
        _results.push(temp.copy(this.chain[index + 1]));
      }
      return _results;
    }