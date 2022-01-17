function( trackEvent ) {
      if( !_dialog ){
        if( _frameType === "window" ){
          _dialog = new WindowDialog( _dialogOptions );
        }
        else{
          _dialog = new IFrameDialog( _dialogOptions );
        } //if
      } //if

      if( !_dialog.closed && _dialog.focus ){
        _dialog.focus();
        return;
      } //if

      _currentTrackEvent = trackEvent;

      _dialog.open({
        open: function( e ){
          var targets = [],
              media = {
                name: butter.currentMedia.name,
                target: butter.currentMedia.target
              };
          for( var i = 0, l = butter.targets.length; i < l; i++ ) {
            targets.push( butter.targets[ i ].element.id );
          }
          var corn = trackEvent.popcornOptions;
          _dialog.send( "trackeventdata", {
            manifest: Popcorn.manifest[ trackEvent.type ],
            popcornOptions: corn,
            targets: targets,
            media: media
          });
          _currentTarget = corn.target;
          blinkTarget();
          trackEvent.listen( "trackeventupdated", onTrackEventUpdated );
          trackEvent.listen( "trackeventupdatefailed", onTrackEventUpdateFailed );
          _this.dispatch( "open" );
        },
        submit: function( e ){
          var popcornData = e.data.eventData,
              alsoClose = e.data.alsoClose;
          if( popcornData ){
            trackEvent.update( popcornData );
            if( alsoClose ){
              _dialog.close();
            } //if
          } //if
        },
        close: function( e ){
          onClose();
        }
      });
    }