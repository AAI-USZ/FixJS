function( ch ) {
          bot.channels.contains( chan ).should.equal( true )
          bot.channels.get( ch.name ).should.equal( chan )
          ch.should.equal( chan )
          done()
        }