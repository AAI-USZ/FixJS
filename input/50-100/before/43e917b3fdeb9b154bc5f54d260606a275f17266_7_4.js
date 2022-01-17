function() {
          bot.channels.contains( chan ).should.equal( true )
          server.recite( f( ":kicky@kick.com KICK #lol,%s @other,%s,+another\r\n", chan, bot.user.nick ) )
          setTimeout( function() {
            bot.channels.contains( chan ).should.equal( false )
            done()
          }, 10 )
        }