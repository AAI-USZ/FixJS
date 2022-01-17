function() {
      const type = cnst.REPLY.TOPIC
          , observable = new Observable( true )
          , before = observable.get( type ) ? observable.get( type ).length : 0

      const h = function( stuff ) {
        stuff.should.equal( "LOL" )
        return STATUS.REMOVE
      }

      observable.add( type, h )
      observable.get( type ).length.should.equal( before + 1 )
      observable.notify( type, "LOL" )
      if ( 0 === before )
        should.not.exist( observable.get( type ) )
      else
        observable.get( type ).length.should.equal( before )
    }