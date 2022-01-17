function( done ) {
        const bot = this
            , chan = this.join( "#addpeople" )
        server.recite( f( ":%s!~a@b.c JOIN %s\r\n", this.user.nick, chan ) )
        // A name reply for a channel
        server.recite( f( ":niven.freenode.net 353 %s @ %s :some +different @nicks\r\n", conf.nick, chan ) )
        // A specific user joins
        server.recite( f( ":protobot!~protobot@lol.com JOIN %s\r\n", chan ) )

        setTimeout( function() {
          should.exist( chan.people.get( o.id( "protobot" ) ) )
          chan.people.get( o.id( "protobot" ) ).should.be.an.instanceof( o.Person )
          should.exist( chan.people.get( o.id( "some" ) ) )
          should.exist( chan.people.get( o.id( "different" ) ) )
          should.exist( chan.people.get( o.id( "nicks" ) ) )
          chan.people.get( o.id( "some" ) ).should.be.an.instanceof( o.Person )
          chan.people.get( o.id( "different" ) ).should.be.an.instanceof( o.Person )
          chan.people.get( o.id( "nicks" ) ).should.be.an.instanceof( o.Person )
          done()
        }, 10 )
      }