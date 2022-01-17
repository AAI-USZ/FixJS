function( done ) {
        const chan = "#removechanname", bot = this
        this.channels.add( chan, function( ch ) {
          bot.channels.contains( chan ).should.equal( true )
          server.on( "message", function ok( m ) {
            if ( ! /PART/.test( m ) )
              return
            server.removeListener( "message", ok )
            m.should.equal( f( "PART %s\r\n", chan ) )
            server.recite( f( ":%s!~a@b.c PART %s\r\n", bot.user.nick, chan ) )
            done()
          })
          bot.channels.remove( chan )
        })
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", this.user.nick, chan ) )
        server.recite( f( ":card.freenode.net 353 %s @ %s :%s\r\n", this.user.nick, chan, this.user.nick ) )
      }