function( ch ) {
          bot.channels.has( o.id( chan ) ).should.equal( true )
          server.on( "message", function ok( m ) {
            if ( ! /PART/.test( m ) )
              return
            server.removeListener( "message", ok )
            m.should.equal( f( "PART %s\r\n", chan ) )
            server.recite( f( ":%s!~a@b.c PART %s\r\n", bot.user.nick, chan ) )
            done()
          })
          bot.part( chan )
        }