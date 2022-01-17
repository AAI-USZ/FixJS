function() {
    var that = this;
    this.board.pick(this.players, 'A1');
    this.board.pick(this.players, 'B1');
    this.board.pick(this.players, 'A2');
    this.board.pick(this.players, 'B2');
    this.board.pick(this.players, 'A3', function(snapshot){
      that.findsWinner.didIWin(snapshot, function(win) {
        win.won.should.be.true;
        win.player.should.equal('Reilly');
        win.slots.should.eql(['A1', 'A2', 'A3']);
      });
    });
    
  }