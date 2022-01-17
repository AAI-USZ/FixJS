function( updateOptions, applyDefaults ) {
      updateOptions = updateOptions || {};

      var failed = false,
          newStart = _popcornOptions.start,
          newEnd = _popcornOptions.end;

      if ( !isNaN( updateOptions.start ) ) {
        newStart = TimeUtil.roundTime( updateOptions.start );
      }
      if ( !isNaN( updateOptions.end ) ) {
        newEnd = TimeUtil.roundTime( updateOptions.end );
      }

      if ( newStart >= newEnd ){
        failed = "invalidtime";
      }
      else {
        if( _track && _track._media ){
          var media = _track._media;
          if( ( newStart > media.duration ) ||
              ( newEnd > media.duration ) ||
              ( newStart < 0 ) ) {
            failed = "invalidtime";
          }
        }
      }

      if( failed ){
        _this.dispatch( "trackeventupdatefailed", failed );
      } else {
        var _manifest = Popcorn.manifest[ _type ] && Popcorn.manifest[ _type ].options;
        if( _manifest ){
          for ( var prop in _manifest ) {
            if ( _manifest.hasOwnProperty( prop ) ) {
              if ( updateOptions[ prop ] === undefined ) {
                if ( applyDefaults ) {
                  _popcornOptions[ prop ] = defaultValue( _manifest[ prop ] );
                }
              } else {
                _popcornOptions[ prop ] = updateOptions[ prop ];
              }
            }
          }

          if ( !( "target" in _manifest ) && updateOptions.target ) {
            _popcornOptions.target = updateOptions.target;
          }
        }

        if( newStart ){
          _popcornOptions.start = newStart;
        }
        if( newEnd ){
          _popcornOptions.end = newEnd;
        }

        _view.update( _popcornOptions );
        _this.popcornOptions = _popcornOptions;

        // if PopcornWrapper exists, it means we're connected properly to a Popcorn instance,
        // and can update the corresponding Popcorn trackevent for this object
        if ( _popcornWrapper ) {
          _popcornWrapper.updateEvent( _this );
        }

        _this.dispatch( "trackeventupdated", _this );
      }

    }