function() {
          should.exist( chan.people.get( "protobot" ) )
          chan.people.get( "protobot" ).should.be.an.instanceof( o.Person )
          should.exist( chan.people.get( "some" ) )
          should.exist( chan.people.get( "different" ) )
          should.exist( chan.people.get( "nicks" ) )
          chan.people.get( "some" ).should.be.an.instanceof( o.Person )
          chan.people.get( "different" ).should.be.an.instanceof( o.Person )
          chan.people.get( "nicks" ).should.be.an.instanceof( o.Person )
          done()
        }