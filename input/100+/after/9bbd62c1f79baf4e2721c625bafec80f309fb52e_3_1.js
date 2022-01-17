function(done) {
    var that = this;
    this.board.pick(this.players, 'B2');
    this.board.pick(this.players, 'A1');
    this.board.pick(this.players, 'A2');
    this.board.pick(this.players, 'C3');
    this.board.pick(this.players, 'C2', function(snapshot) {
      that.findsWinner.didIWin(snapshot, function(win) {
        win.won.should.be.true;
        win.player.should.equal('Reilly');
        win.slots.should.eql(['A2', 'B2', 'C2']);
        done();
      });
    });
  }