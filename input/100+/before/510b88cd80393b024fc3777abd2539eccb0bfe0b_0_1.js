function( val ){
          _parent = val;

          if( _draggable ){
            _draggable.destroy();
            _draggable = null;
          }

          if( _resizable ){
            toggleHandles( false );
            _resizable.destroy();
            _resizable = null;
            _handles = null;
          }

          if( _parent ){

            if( _parent.element && _parent.element.parentNode && _parent.element.parentNode.parentNode ){

              _draggable = DragNDrop.draggable( _element, {
                containment: _parent.element.parentNode,
                scroll: _parent.element.parentNode.parentNode,
                start: function(){
                  _this.dispatch( "trackeventdragstarted" );
                },
                stop: function(){
                  _this.dispatch( "trackeventdragstopped" );
                  movedCallback();
                },
                revert: true
              });

              _resizable = DragNDrop.resizable( _element, {
                containment: _parent.element.parentNode,
                scroll: _parent.element.parentNode.parentNode,
                stop: movedCallback
              });

              _element.setAttribute( "data-butter-draggable-type", "trackevent" );
              _element.setAttribute( "data-butter-trackevent-id", trackEvent.id );

              if( !_handles ){
                _handles = _element.querySelectorAll( ".handle" );
                if( _handles && _handles.length === 2 ){
                  _element.addEventListener( "mouseover", function( e ){
                    toggleHandles( true );
                  }, false );
                  _element.addEventListener( "mouseout", function( e ){
                    toggleHandles( false );
                  }, false );
                  toggleHandles( false );
                }
              }

            }

            resetContainer();
          } //if
        }