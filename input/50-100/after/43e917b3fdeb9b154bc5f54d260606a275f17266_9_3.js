function( ch ) {
          chan.should.equal( ch )
          ch.people.has( bot.user.id ).should.equal( true )
          ch.people.has( o.id( "nlogax" ) ).should.equal( true )
          done()
        }