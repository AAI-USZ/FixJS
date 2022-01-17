function( ch ) {
          bot.channels.has( chan.id ).should.equal( true )
          server.on( "message", function ok( m ) {
            if ( ! /PART/.test( m ) )
              return
            server.removeListener( "message", ok )
            m.should.equal( f( "PART %s\r\n", chan ) )
          })
          bot.part( chan )
          bot.observe( COMMAND.PART, function() {
            bot.channels.has( chan.id ).should.equal( false )
            return STATUS.REMOVE
          })
          server.recite( f( ":%s!~a@b.c PART %s\r\n", bot.user.nick, chan ) )
          done()
        }