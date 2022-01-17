function( ch ) {
          bot.channels.has( chan.id ).should.equal( true )
          bot.channels.get( ch.id ).should.equal( chan )
          ch.should.equal( chan )
          done()
        }