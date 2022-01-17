function( b ) {
          b.should.be.an.instanceof( Bot )
          done()
          return STATUS.REMOVE
        }