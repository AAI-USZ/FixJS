function() {
    var that = this;
    this.board.pick(this.players, 'A1', function(snapshot){
      snapshot.A.should.eql(['A1']);
      that.findsWinner.didIWin(snapshot, function(win) {
        win.won.should.be.false;
     });
    });
  }