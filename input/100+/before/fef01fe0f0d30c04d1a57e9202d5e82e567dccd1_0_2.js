function( domEvent, widgetTarget ) {

      var result = {};

      if( widgetTarget ) {

        if( this._isDraggableWidget( widgetTarget ) ) {

          result.drag = true;

          result.click = true;

        } else {

          var nativeScrollable = this._isScrollableWidget( domEvent.target );

          if( this._allowNativeScroll && nativeScrollable ) {

            result.scroll = true;

          } else if( nativeScrollable || this._isTreeRow( widgetTarget ) ) {

            result.virtualScroll = true;

          } 

          if( this._isFocusable( widgetTarget ) || this._isSelectable( widgetTarget ) ) {

            // when in a scrolled composite focusing seems only to work reliably with

            // style.webkitOverflowScrolling = "touch";

            result.focus = true;

//            if( org.eclipse.rwt.Client.isAndroidBrowser() ) {

//              delete result.virtualScroll;

//            }

          } else {

            result.click = true;

          }

        } 

      }

      return result;

    }