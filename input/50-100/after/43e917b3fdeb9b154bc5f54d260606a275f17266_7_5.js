function( ch, err ) {
          err.should.be.an.instanceof( Error )
          err.message.should.equal( "Forwarding to another channel" )
          ch.name.should.equal( c2.name )
          bot.channels.has( c2.id ).should.equal( true )
          bot.channels.has( o.id( "#fwdfrom" ) ).should.equal( false )
          done()
        }