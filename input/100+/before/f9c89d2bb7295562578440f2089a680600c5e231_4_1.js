function loadIcons( icons, resourcesDir ){
    var icon, img, div;

    for( icon in icons ){
      if( icons.hasOwnProperty( icon ) ){
        img = new Image();
        img.id = icon + "-icon";
        img.src = resourcesDir + icons[ icon ];

        // We can't use "display: none", since that makes it
        // invisible, and thus not load.  Opera also requires
        // the image be in the DOM before it will load.
        div = document.createElement( "div" );
        div.setAttribute( "data-butter-exclude", "true" );
        div.className = "butter-image-preload";

        div.appendChild( img );
        document.body.appendChild( div );
      }
    }
  }