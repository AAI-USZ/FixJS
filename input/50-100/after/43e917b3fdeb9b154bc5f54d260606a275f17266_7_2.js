function( ch ) {
          bot.channels.has( o.id( "#addchanobj" ) ).should.equal( true )
          bot.channels.get( o.id( "#addchanobj" ) ).should.equal( chan )
          bot.channels.get( ch.id ).should.equal( chan )
          done()
        }