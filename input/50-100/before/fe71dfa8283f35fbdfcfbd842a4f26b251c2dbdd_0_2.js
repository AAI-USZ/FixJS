function highlightTarget( anchor ) {
  console.debug( "Highlighting target '%s'.", anchor );

  $("a[name=" + anchor + "]").each( function() {
    if ( !$(this).parent().parent().hasClass('target-section') ) {
      console.debug( "Wrapping the target-section" );
      $('div.method-detail').unwrap( 'div.target-section' );
      $(this).parent().wrap( '<div class="target-section"></div>' );
    } else {
      console.debug( "Already wrapped." );
    }
  });
}