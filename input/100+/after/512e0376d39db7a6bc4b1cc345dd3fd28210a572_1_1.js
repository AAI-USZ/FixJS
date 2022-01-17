function ( pattern ) {
      var pluginElement;
      if ( !pattern ) {
        pluginElement = document.createElement( "span" );
        pluginElement.innerHTML = _this.type + " ";
      }
      else {
        var patternInstance = pattern.replace( /\$type/g, _this.type );
        var range = document.createRange();
        range.selectNode( document.body.children[ 0 ] );
        pluginElement = range.createContextualFragment( patternInstance ).childNodes[ 0 ];
      }
      pluginElement.id = PLUGIN_ELEMENT_PREFIX + _this.type;
      pluginElement.setAttribute( "data-butter-plugin-type", _this.type );
      pluginElement.setAttribute( "data-butter-draggable-type", "plugin" );
      DragNDrop.helper( pluginElement, {
        image: _helper,
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
      this.element = pluginElement;
      return pluginElement;
    }