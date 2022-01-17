function( done ) {
        const nick = "unique"
            , c1 = this.channels.add( "#channelone" )
            , c2 = this.channels.add( "#channeltwo"
              , function( ch ) {
                ch.people.get( nick ).should.equal( c1.people.get( nick ) )
                c1.people.get( nick ).should.equal( c2.people.get( nick ) )
                done()
              })
        server.recite( f( ":%s@wee JOIN %s\r\n", this.user.nick, c1 ) )
        server.recite( f( ":%s@wee JOIN %s\r\n", this.user.nick, c2 ) )
        server.recite( f( ":card.freenode.net 353 %s @ %s :%s nlogax\r\n", this.user.nick, c1, nick ) )
        server.recite( f( ":card.freenode.net 353 %s @ %s :%s nlogax\r\n", this.user.nick, c2, nick ) )
      }