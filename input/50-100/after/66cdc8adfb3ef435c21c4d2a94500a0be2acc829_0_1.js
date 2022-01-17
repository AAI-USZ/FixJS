function( e ) {
    e.preventDefault();

    console.dir($(this).data('events'));

    if ( APP.getState() === "small" ) {
      console.log( "slideSubNav" );
      $( this ).siblings( "ul" ).stop().slideToggle().toggleClass( "open" );
    }
  }