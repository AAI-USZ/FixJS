function() {
      var index, moveTo, pair, piece, temp, _i, _j, _len, _len1, _ref, _ref1, _results;
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
      if (this.moves.isEmpty()) {
        this.seekingFood = false;
      }
      if (!this.seekingFood) {
        _ref = this._findFoodPath();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          pair = _ref[_i];
          this.moves.enqueue(pair);
        }
        this.seekingFood = true;
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
      for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
        piece = _ref1[index];
        this.grid.moveSquare(piece, moveTo, 'snake');
        piece.copy(moveTo);
        moveTo.copy(temp);
        _results.push(temp.copy(this.chain[index + 1]));
      }
      return _results;
    }