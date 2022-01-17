function( butter ){

      ok( butter.media.length > 0 && butter.media[0].url === "http://www.youtube.com/watch?v=7glrZ4e4wYU", "URL match" );
      ok( document.getElementById( "strange-test-1" ), "New element exists" );
      equals( document.getElementById( "strange-test-1" ).attributes.length, el.attributes.length, "has same attribute list length" );
      equals( document.getElementById( "strange-test-1" ).getAttribute( "data-butter" ), "media", "has data-butter attribute" );

      el.removeAttribute( "data-butter-source" );
      el.removeAttribute( "data-butter" );

      start();
    }