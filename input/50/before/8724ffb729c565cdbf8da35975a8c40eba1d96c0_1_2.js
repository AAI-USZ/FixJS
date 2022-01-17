function(win) {
        win.won.should.be.true;
        win.player.should.equal('Reilly');
        win.slots.should.eql(['A1', 'A2', 'A3']);
      }