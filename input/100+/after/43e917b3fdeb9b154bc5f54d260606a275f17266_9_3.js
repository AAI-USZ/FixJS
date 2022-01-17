function( done ) {
        const chan = o.channel( "#keyjoin" ).for( this )
            , key = "keymaster"
            , bot = this
        chan.join( key, function( ch ) {
          bot.channels.has( chan.id ).should.equal( true )
          done()
        })
        this.channels.has( chan.id ).should.equal( false )
        server.on( "message", function ok( m ) {
          if ( ! /JOIN/.test( m ) )
            return
          server.removeListener( "message", ok )
          m.should.equal( f( "JOIN %s %s\r\n", chan.name, key ) )
        })
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", this.user.nick, chan ) )
        server.recite( f( ":card.freenode.net 353 %s @ %s :%s nlogax\r\n"
                        , this.user.nick, chan, this.user.nick ) )
      }