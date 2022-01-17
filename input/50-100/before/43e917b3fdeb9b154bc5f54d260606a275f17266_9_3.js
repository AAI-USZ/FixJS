function( ch ) {
          chan.should.equal( ch )
          ch.people.contains( bot.user ).should.equal( true )
          ch.people.contains( "nlogax" ).should.equal( true )
          done()
        }