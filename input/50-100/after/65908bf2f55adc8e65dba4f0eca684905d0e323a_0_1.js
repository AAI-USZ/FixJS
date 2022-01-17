function() {
    mqb.version = '1.3.5';
    mqb.mqList = [];
    mqb.matchMedia = window.matchMedia !== undefined;

    var bookmarklet = document.getElementById( 'sb-mediaQueryBookmarklet' );
    if ( bookmarklet ) {
      document.body.removeChild( bookmarklet );
    }
  }