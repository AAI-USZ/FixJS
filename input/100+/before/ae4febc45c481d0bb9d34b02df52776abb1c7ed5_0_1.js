function( options ) {

      var target,
          text,
          container = options._container = document.createElement( "a" );

      container.style.display = "none  ";

      target = document.getElementById( options.target );

      // cache reference to actual target container
      options._target = target;
      text = options.text;

      container.href = "#" + options.timecode || "";
      container.innerHTML = text || "";
      container.className = "btn btn-full-width btn-red";

      target.appendChild( container );

    }