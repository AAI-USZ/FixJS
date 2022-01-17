function(win) {
        win.won.should.be.true;
        win.player.should.equal('Declan');
        win.slots.should.eql(['B1', 'B2', 'B3']);
      }