function( domEvent ) {
      var touch = this._getTouch( domEvent );
      var target = domEvent.target;
      var widgetTarget = org.eclipse.rwt.EventHandlerUtil.getOriginalTargetObject( target );
      var pos = [ touch.clientX, touch.clientY ];
      this._touchSession = {
       "type" : this._getSessionType( domEvent, widgetTarget ),
       "initialTarget" : target,
       "initialWidgetTarget" : widgetTarget,
       "initialPosition" : pos
      };
      if( !this._touchSession.type.scroll ) {
        if( !org.eclipse.rwt.Client.isAndroidBrowser() || !this._touchSession.type.focus ) {
          domEvent.preventDefault();
        }
      }
      this._moveMouseTo( target, domEvent );
      if( this._touchSession.type.click ) {
        this._fireMouseEvent( "mousedown", target, domEvent, pos );
      }
      if( this._touchSession.type.virtualScroll ) {
        this._initVirtualScroll( widgetTarget );
      }
    }