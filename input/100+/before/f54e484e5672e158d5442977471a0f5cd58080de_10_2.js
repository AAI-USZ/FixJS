function() {
      const type = cnst.REPLY.TOPIC
          , before = _obs[type] ? _obs[type].length : 0
          , observable = new Observable( true )

      const h = function( stuff ) {
        stuff.should.equal( "LOL" )
        return STATUS.REMOVE
      }

      observable.add( type, h )
      _obs[type].length.should.equal( before + 1 )
      observable.notify( type, "LOL" )
      if ( 0 === before )
        should.not.exist( _obs[type] )
      else
        _obs[type].length.should.equal( before )
    }