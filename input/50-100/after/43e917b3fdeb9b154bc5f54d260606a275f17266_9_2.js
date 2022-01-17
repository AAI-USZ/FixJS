function( done ) {
        const chan = o.channel( "#gotmodez" )
        this.join( chan )
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", this.user.nick, chan ) )
        server.recite( ":the.server.com MODE #gotmodez +ami\r\n" )
        server.recite( ":the.server.com MODE #gotmodez -i\r\n" )
        setTimeout( function() {
          chan.mode.sort().should.eql( [ 'a', 'm' ] )
          done()
        }, 10 )
      }