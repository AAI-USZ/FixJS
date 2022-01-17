function() {
          // Currently fails because I wanted to be cool and use a Map, then noticed
          // the lack of iteration/enumeration of keys, needed to check for and remove
          // a user from all channels in which they might be lurking.
          should.not.exist( bot.channels.get( "#removepeople" ).people.get( "protobot1" ) )
          should.not.exist( bot.channels.get( "#removepeople" ).people.get( "protobot2" ) )
          should.not.exist( bot.channels.get( "#removepeople" ).people.get( "protobot3" ) )
          should.not.exist( bot.channels.get( "#quitters" ).people.get( "protobot3" ) )
          done()
        }