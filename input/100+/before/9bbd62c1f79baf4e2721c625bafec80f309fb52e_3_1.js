function() {
  beforeEach(function(){
    this.findsWinner = new FindsWinner();
    this.players = new Players('Reilly', 'Declan');
    this.board = new Board(this.players);
  });

  it('with 1 move I did not win', function(done) {
    var that = this;
    this.board.pick(this.players, 'A1', function(snapshot){
      snapshot.A.should.eql(['A1']);
      that.findsWinner.didIWin(snapshot, function(win) {
        win.won.should.be.false;
        done();
     });
    });
  });

  it('when A wins, first row', function(done) {
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
        done();
      });
    });
    
  });

  it('when B wins, second row', function(done) {
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
  });

  it('when B wins, third row', function(done) {
    var that = this;
    this.board.pick(this.players, 'A1');
    this.board.pick(this.players, 'C1');
    this.board.pick(this.players, 'A2');
    this.board.pick(this.players, 'C2');
    this.board.pick(this.players, 'B1');
    this.board.pick(this.players, 'C3', function(snapshot) {
      that.findsWinner.didIWin(snapshot, function(win) {
        win.won.should.be.true;
        win.player.should.equal('Declan');
        win.slots.should.eql(['C1', 'C2', 'C3']);
        done();
      });
    });
  });

  it('when A wins, first column', function(done) {
    var that = this;
    this.board.pick(this.players, 'A1');
    this.board.pick(this.players, 'C2');
    this.board.pick(this.players, 'B1');
    this.board.pick(this.players, 'C3');
    this.board.pick(this.players, 'C1', function(snapshot) {
      that.findsWinner.didIWin(snapshot, function(win) {
        win.won.should.be.true;
        win.player.should.equal('Reilly');
        win.slots.should.eql(['A1', 'B1', 'C1']);
        done();
      });
    });
  });

}