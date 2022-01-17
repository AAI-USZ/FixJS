function( done ) {
        const chan  = o.channel( "#setowntopic" ).for( this )
            , topic = "My own topic should be set to this"
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", this.user.nick, chan ) )
        server.on( "message", function ok( m ) {
          if ( ! /TOPIC #setowntopic/.test( m ) )
            return
          server.removeListener( "message", ok )
          server.recite( f( ":topic@setter.com TOPIC %s :%s\r\n", chan, topic ) )
          setTimeout( function() {
            chan.topic.should.equal( topic )
            done()
          }, 10 )
        })
        chan.setTopic( topic )
      }