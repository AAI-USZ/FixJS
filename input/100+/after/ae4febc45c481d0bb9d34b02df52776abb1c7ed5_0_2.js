function ( Popcorn ) {

  /**
   * Links Popcorn plug-in
  */
  Popcorn.plugin( "sidebar-link", {

    manifest: {
      about: {
        name: "Popcorn Sidebar Link Plugin",
        version: "0.1",
        author: "@k88hudson"
      },
      options: {
        start: {
          elem: "input",
          type: "text",
          label: "In",
          hidden: true
        },
        end: {
          elem: "input",
          type: "text",
          label: "Out",
          hidden: true
        },
        text: {
          elem: "input",
          type: "text",
          label: "Text",
          "default": "Popcorn.js"
        },
        timecode: {
          elem: "input",
          type: "number",
          label: "Timecode for link (in s)"
        },
        style: {
          elem: "input",
          type: "text",
          label: "styles",
          "default": "btn btn-full-width btn-red"
        }
        target: {
          elem: "select",
          options: ["now-playing-links"],
          "default": "now-playing-links"
        }
      }
    },

    _setup: function( options ) {

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

    },

    start: function( event, options ) {
      //options._container.style.display = "block";
    },
    end: function( event, options ) {
      //options._container.style.display = "none";
    },

    _teardown: function( options ) {
      var target = options._target;
      if ( target ) {
        target.removeChild( options._container );
      }
    }
  });
}