function( updateOptions, applyDefaults ) {
      updateOptions = updateOptions || {};

      var newStart = _popcornOptions.start,
          newEnd = _popcornOptions.end,
          manifestOptions;

      if ( updateOptions.start ) {
        if ( !isNaN( updateOptions.start ) ) {
          newStart = TimeUtil.roundTime( updateOptions.start );
        }
        else {
          throw new TrackEventUpdateException( "invalid-start-time", "[start] is an invalid value." );
        }
      }

      if ( updateOptions.end ) {
        if ( !isNaN( updateOptions.end ) ) {
          newEnd = TimeUtil.roundTime( updateOptions.end );
        }
        else {
          throw new TrackEventUpdateException( "invalid-end-time", "[end] is an invalid value." );
        }

      }

      if ( newStart >= newEnd ) {
        throw new TrackEventUpdateException( "start-greater-than-end", "[start] must be equal to or less than [end]." );
      }
      if ( _track && _track._media && _track._media.ready ) {
        var media = _track._media;
        if( ( newStart > media.duration ) ||
            ( newEnd > media.duration ) ||
            ( newStart < 0 ) ) {
          throw new TrackEventUpdateException( "invalid-times", "[start] or [end] are not within the duration of media" );
        }
      }

      if ( this.manifest ) {
        manifestOptions = this.manifest.options;
        for ( var prop in manifestOptions ) {
          if ( manifestOptions.hasOwnProperty( prop ) ) {
            if ( updateOptions[ prop ] === undefined ) {
              if ( applyDefaults ) {
                _popcornOptions[ prop ] = defaultValue( manifestOptions[ prop ] );
              }
            } else {
              _popcornOptions[ prop ] = updateOptions[ prop ];
            }
          }
        }
        if ( !( "target" in manifestOptions ) && updateOptions.target ) {
          _popcornOptions.target = updateOptions.target;
        }
      }
      
      if( newStart ){
        _popcornOptions.start = newStart;
      }
      if( newEnd ){
        _popcornOptions.end = newEnd;
      }

      // if PopcornWrapper exists, it means we're connected properly to a Popcorn instance,
      // and can update the corresponding Popcorn trackevent for this object
      if ( _popcornWrapper ) {
        _popcornWrapper.updateEvent( _this );
      }

      _view.update( _popcornOptions );
      _this.popcornOptions = _popcornOptions;

      console.log( _popcornOptions.start );

      // we should only get here if no exceptions happened
      _this.dispatch( "trackeventupdated", _this );

    }