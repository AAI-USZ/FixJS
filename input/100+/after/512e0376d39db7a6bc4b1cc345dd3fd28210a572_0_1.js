function( e ){
      var element = document.createElement( "div" ),
      icon = e.data.helper,
      text = document.createElement( "span" );

      DragNDrop.helper( element, {
        start: function(){
          var targets = butter.targets,
              media = butter.currentMedia;
          media.view.blink();
          for( var i=0, l=targets.length; i<l; ++i ){
            targets[ i ].view.blink();
          }
        },
        stop: function(){
          
        }
      });

      if( icon ) {
        icon.removeAttribute( "id" );
        icon.removeAttribute( "style" );
        element.appendChild(icon);
      }

      text.innerHTML = e.data.type;
      element.appendChild( text );

      element.setAttribute( "data-butter-plugin-type", e.data.type );
      element.setAttribute( "data-butter-draggable-type", "plugin" );
      
      _containerElement.appendChild( element );
    }