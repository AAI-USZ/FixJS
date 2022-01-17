function( options ) {

      var _popcorn = this,
          target,
          text,
          container = options._container = document.createElement( "a" );

      //container.style.display = "none ";

      target = document.getElementById( options.target );

      // cache reference to actual target container
      options._target = target;
      text = options.text;

      container.setAttribute( "for", "#" + options.timecode || "" );
      container.innerHTML = text || "";
      container.className = options.style;

      target.appendChild( container );

      container.addEventListener("click", function(e){
        e.preventDefault();
        var link = container.getAttribute("for").replace("#", "");
        _popcorn.currentTime( link ).play();
      },false);

    }