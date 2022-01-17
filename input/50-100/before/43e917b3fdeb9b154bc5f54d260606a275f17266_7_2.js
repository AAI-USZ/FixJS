function( ch ) {
          bot.channels.contains( "#addchanobj" ).should.equal( true )
          bot.channels.get( "#addchanobj" ).should.equal( chan )
          bot.channels.get( ch ).should.equal( chan )
          done()
        }