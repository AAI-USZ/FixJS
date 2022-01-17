function( e ) {
    e.preventDefault();

    if ( APP.getState() === "small" ) {
      console.log( "slideSubNav" );
      $( this ).siblings( "ul" ).stop().slideToggle().toggleClass( "open" );
    }
  }