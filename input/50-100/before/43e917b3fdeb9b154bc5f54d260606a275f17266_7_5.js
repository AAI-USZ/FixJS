function( ch, err ) {
          err.should.be.an.instanceof( Error )
          err.message.should.equal( "Forwarding to another channel" )
          ch.name.should.equal( c2.name )
          bot.channels.contains( c2 ).should.equal( true )
          bot.channels.contains( "#fwdfrom" ).should.equal( false )
          done()
        }