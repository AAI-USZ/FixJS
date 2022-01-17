function() {
        if (this.row == null || this.col == null) {
            // initial placement when added to grid
            var t = (this.grid.ants.length+1);
            this.row = Math.floor((t * Math.sin(t) + 50)/100 * this.grid.rows);
            this.col = Math.floor((t * Math.cos(t) + 50)/100 * this.grid.cols);
            this._saveInitialState();
        } else if (! this.grid.isInBounds(this.row, this.col)) {
            // grid resized leaving this ant out of bounds
            throw Error('unimplemented');
        }
    }