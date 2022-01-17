function changeUrl(){
      var validTextboxes = [],
          textboxes = _container.querySelectorAll( "input[type='text']" ),
          errorTextboxes = [];

      _subtitle.classList.add( "form-ok" );
      _subtitle.classList.remove( "form-error" );

      for ( var i = 0, len = textboxes.length; i < len; i++ ) {
        textboxes[ i ].classList.add( "form-ok" );
        textboxes[ i ].classList.remove( "form-error" );
        if ( testUrl( textboxes[ i ].value ) ) {
          validTextboxes.push( textboxes[ i ].value );
        }
        else {
          _subtitle.classList.remove( "form-ok" );
          _subtitle.classList.add( "form-error" );
          errorTextboxes.push( textboxes[ i ] );
          textboxes[ i ].classList.remove( "form-ok" );
          textboxes[ i ].classList.add( "form-error" );
        }
      }

      if ( errorTextboxes.length ) {
        showError( true, "URL(s) not valid. Please use http://..." );
      }
      else if ( validTextboxes.length ) {
        _subtitle.innerHTML = "URL changed.";
        media.url = validTextboxes;
      }

    }