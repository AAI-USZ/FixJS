function trackEventMouseUp( e ){
        if( butter.selectedEvents.length === 1 && !e.target.trackEvent.dragging ){
          _this.edit( e.target.trackEvent );
        }
      }