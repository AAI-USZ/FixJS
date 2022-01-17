function( done ) {
        const chan  = this.channels.add( "#updatetopic" ).for( this )
            , topic = "This topic is so up to date"
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", this.user.nick, chan ) )
        server.recite( f( ":topic@setter.com TOPIC %s :%s\r\n", chan, topic ) )
        setTimeout( function() {
          chan.topic.should.equal( topic )
          done()
        }, 10 )
      }