function( b ) {
          b.should.be.an.instanceof( IRC )
          done()
          return STATUS.REMOVE
        }