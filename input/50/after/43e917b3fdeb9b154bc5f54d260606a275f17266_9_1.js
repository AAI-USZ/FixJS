function( ch ) {
          bot.channels.has( chan.id ).should.equal( true )
          done()
        }