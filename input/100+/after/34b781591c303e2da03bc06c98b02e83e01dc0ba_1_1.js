function ( dialog, track ) {
    var rootElement = dialog.rootElement;

    var trackName = rootElement.querySelector( ".track-name" ),
        trackData = rootElement.querySelector( ".track-data" );

    var data = track.json;

    dialog.listen( "error", function ( e ) {
      dialog.showError( "Invalid JSON" );
    });

    dialog.registerActivity( "update", function ( e ){
      dialog.hideError();
      dialog.send( "submit", trackData.value );
    });

    dialog.assignButton( ".update", "update" );

    trackName.innerHTML = data.name;
    trackData.value = JSON.stringify( data );
    dialog.enableCloseButton();
    dialog.enableElements( ".update" );
    dialog.assignEscapeKey( "default-close" );
    dialog.assignEnterKey( "update" );
    trackData.removeAttribute( "readonly" );
    trackData.addEventListener( "keyup", function ( e ) {
      dialog.hideError();
    }, false );

  }