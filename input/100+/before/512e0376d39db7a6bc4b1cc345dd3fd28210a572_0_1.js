function( e ){
      var element = document.createElement( "div" );

      DragNDrop.helper( element, {
        //image: e.data.helper,
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
      element.icon = e.data.helper;
      if(element.icon) {
        element.icon.removeAttribute('id');
        element.icon.removeAttribute('style');
        element.appendChild(element.icon);
      }
      element.text = document.createElement("span");
      element.text.innerHTML = e.data.type;
      element.appendChild(element.text);

      element.setAttribute( "data-butter-plugin-type", e.data.type );
      element.setAttribute( "data-butter-draggable-type", "plugin" );
      
      _containerElement.appendChild( element );
    }