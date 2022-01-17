function __createDialog( layoutSrc, dialogCtor ) {
    return function ( spawnOptions ) {

      spawnOptions = spawnOptions || {};

      var _listeners = spawnOptions.events || {},
          _activities = {},
          _rootElement = LangUtils.domFragment( layoutSrc ),
          _enterKeyActivity,
          _escapeKeyActivity,
          _modal;

      // make sure have a handle to the butter-dialog div
      if ( !( _rootElement.classList && _rootElement.classList.contains( "butter-dialog" ) ) ) {
        _rootElement = _rootElement.querySelector( ".butter-dialog" );
      }

      function onKeyDown( e ) {
        if (  _enterKeyActivity &&
              __keyboardAvoidElements.indexOf( e.target.nodeName ) === -1 &&
              ( e.which === 13 || e.keyCode === 13 ) ) {
          _activities[ _enterKeyActivity ]( e );
        }
        else if ( _escapeKeyActivity &&
                  __keyboardAvoidElements.indexOf( e.target.nodeName ) === -1 &&
                  ( e.which === 27 || e.keyCode === 27 ) ) {
          _activities[ _escapeKeyActivity ]( e );
        }
      }

      var _internal = {
        rootElement: _rootElement,

        activity: function( activityName ){
          _activities[ activityName ]();
        },

        enableCloseButton: function(){
          var closeButton = _rootElement.querySelector( ".close-button" );
          if( closeButton ){
            closeButton.addEventListener( "click", function closeClickHandler( e ){
              _internal.activity( "default-close" );
              closeButton.removeEventListener( "click", closeClickHandler, false );
            }, false );
          }
        },

        showError: function( message ){
          var element = _rootElement.querySelector( ".error" );
          if( element ){
            element.innerHTML = message;
            _rootElement.setAttribute( "data-error", true );
          }
        },

        hideError: function(){
          _rootElement.removeAttribute( "data-error" );
        },

        assignEnterKey: function( activityName ){
          _enterKeyActivity = activityName;
        },

        assignEscapeKey: function( activityName ){
          _escapeKeyActivity = activityName;
        },

        registerActivity: function( name, callback ){
          _activities[ name ] = callback;
        },

        assignButton: function( selector, activityName ){
          var element = _rootElement.querySelector( selector );
          element.addEventListener( "click", _activities[ activityName ], false );
        },

        enableElements: function(){
          var i = arguments.length;
          while ( i-- ) {
            _rootElement.querySelector( arguments[ i ] ).removeAttribute( "disabled" );
          }
        },

        disableElements: function(){
          var i = arguments.length;
          while ( i-- ) {
            _rootElement.querySelector( arguments[ i ] ).setAttribute( "disabled", true );
          }
        },

        send: function( message, data ){
          _external.dispatch( message, data );
        }
      };

      var _external = {
        element: _rootElement,

        open: function() {
          for ( var e in _listeners ) {
            if ( _listeners.hasOwnProperty( e ) ) {
              _external.listen( e, _listeners[ e ] );
            }
          }
          _modal = new Modal( _rootElement );
          setTimeout( function() {
            _external.focus();
          }, 0 );
          document.addEventListener( "keydown", onKeyDown, false );
          _internal.dispatch( "open" );
          _external.dispatch( "open" );
        },

        close: function() {
          for( var e in _listeners ){
            if ( _listeners.hasOwnProperty( e ) ) {
              if ( e !== "close" ) {
                _internal.unlisten( e, _listeners[ e ] );
              }
            }
          }
          _modal.destroy();
          _modal = null;
          document.removeEventListener( "keydown", onKeyDown, false );
          _internal.dispatch( "close" );
          _external.dispatch( "close" );
        },

        send: function( message, data ) {
          _internal.dispatch( message, data );
        },

        focus: function() {
          _rootElement.focus();
          _internal.dispatch( "focus" );
        }

      };

      EventManagerWrapper( _internal );
      EventManagerWrapper( _external );

      _internal.registerActivity( "default-close", function(){
        _external.close();
      });

      _internal.registerActivity( "default-ok", function(){
        _external.dispatch( "submit" );
        _external.close();
      });

      dialogCtor( _internal, spawnOptions.data );

      return _external;
    };
  }