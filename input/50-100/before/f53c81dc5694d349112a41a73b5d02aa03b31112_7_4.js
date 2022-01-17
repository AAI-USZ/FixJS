function() {
          if ( isCallbackTriggered ) {
            return;
          }
          callback.call( instance.element, $elems );
          isCallbackTriggered = true;
        }