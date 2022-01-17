function () {
    // set the map's mode option based on value of the input clicked
    var modeValue = $( this ).val( );
    map.geomap( "option", "mode", modeValue );

    // if mode is one of the draw modes (or remove), show the target section, otherwise hide it
    $( "#clickTarget" ).toggle( modeValue.substr( 0, 4 ) === "draw" || modeValue === "remove" );

    // if mode is one of the draw modes,
    // show the label inputs & shape style as well
    $( "#shapeLabels, #drawStyle" ).toggle( modeValue.substr( 0, 4 ) === "draw" );

    // also display the current mode on the button
    $( "#change-mode .ui-button-text" ).text( modeValue );

    // hide the mode options
    $( "#modeOptions" ).hide( );
  }