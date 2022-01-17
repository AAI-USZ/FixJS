function( done ) {
        const chan = this.channels.add( "#kickedfrom" ), bot = this
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", bot.user.nick, chan ) )
        setTimeout( function() {
          bot.channels.contains( chan ).should.equal( true )
          server.recite( f( ":kicky@kick.com KICK #lol,%s @other,%s,+another\r\n", chan, bot.user.nick ) )
          setTimeout( function() {
            bot.channels.contains( chan ).should.equal( false )
            done()
          }, 10 )
        }, 10 )
      }