function( done ) {
        const chan = o.channel( "#removepeople" ).for( this ).join()
            , bot  = this
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", bot.user.nick, chan ) )
        // Hit and run lol
        server.recite( ":protobot1!~protobot@rogers.com JOIN #removepeople\r\n" )
        server.recite( ":protobot1!~protobot@rogers.com PART #removepeople\r\n" )
        // getting kicked should also remove the person
        server.recite( ":protobot2!~protobot@rogers.com JOIN #removepeople\r\n" )
        server.recite( ":evilbot!~nemesis@rogers.com KICK #removepeople protobot2\r\n" )
        // also quitting
        bot.join( "#quitters" )
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", bot.user.nick, "#quitters" ) )
        server.recite( ":protobot3!~protobot@rogers.com JOIN #removepeople\r\n" )
        server.recite( ":protobot3!~protobot@rogers.com JOIN #quitters\r\n" )
        server.recite( ":protobot3!~protobot@rogers.com QUIT :Laterz\r\n" )
        setTimeout( function() {
          // Currently fails because I wanted to be cool and use a Map, then noticed
          // the lack of iteration/enumeration of keys, needed to check for and remove
          // a user from all channels in which they might be lurking.
          should.not.exist( bot.channels.get( o.id( "#removepeople" ) ).people.get( "protobot1" ) )
          should.not.exist( bot.channels.get( o.id( "#removepeople" ) ).people.get( "protobot2" ) )
          should.not.exist( bot.channels.get( o.id( "#removepeople" ) ).people.get( "protobot3" ) )
          should.not.exist( bot.channels.get( o.id( "#quitters" ) ).people.get( "protobot3" ) )
          done()
        }, 10 )
      }