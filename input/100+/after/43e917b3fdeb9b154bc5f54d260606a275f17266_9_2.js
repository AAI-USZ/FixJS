function( done ) {
        const chan = this.join( "#modez" )
            , mode = "+it"
        server.on( "message", function ok( m ) {
          if ( ! /MODE #modez/.test( m ) )
            return
          server.removeListener( "message", ok )
          m.should.equal( f( "MODE %s %s\r\n", chan, mode ) )
          server.recite( f( ":lol@omg.com MODE %s %s\r\n", chan, mode ) )
        })
        this.observe( COMMAND.MODE, function() {
          chan.mode.sort().should.eql( [ 'i', 't' ] )
          done()
        })
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", this.user.nick, chan ) )
        chan.setMode( mode )
      }