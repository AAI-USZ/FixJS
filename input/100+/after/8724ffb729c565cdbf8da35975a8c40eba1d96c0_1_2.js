function(done) {
    var that = this;
    this.board.pick(this.players, 'A1');
    this.board.pick(this.players, 'B1');
    this.board.pick(this.players, 'A2');
    this.board.pick(this.players, 'B2');
    this.board.pick(this.players, 'C1');
    this.board.pick(this.players, 'B3', function(snapshot) {
      that.findsWinner.didIWin(snapshot, function(win) {
        win.won.should.be.true;
        win.player.should.equal('Declan');
        win.slots.should.eql(['B1', 'B2', 'B3']);
        done();
      });
    });
  }