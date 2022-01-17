function( done ) {
        const nick = "unique"
            , bot  = this
        bot.join( "#channelone" )
        bot.join( "#channeltwo"
          , function( ch ) {
            ch.people.get( o.id( nick ) ).should.equal(
              bot.channels.get( o.id( "#channelone" ) ).people.get( o.id( nick ) ) )
            done()
          })
        server.recite( f( ":%s@wee JOIN %s\r\n", this.user.nick, "#channelone" ) )
        server.recite( f( ":%s@wee JOIN %s\r\n", this.user.nick, "#channeltwo" ) )
        server.recite( f( ":card.freenode.net 353 %s @ %s :%s nlogax\r\n", this.user.nick, "#channelone", nick ) )
        server.recite( f( ":card.freenode.net 353 %s @ %s :%s nlogax\r\n", this.user.nick, "#channeltwo", nick ) )
      }