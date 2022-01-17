function( pluginOptions ){
    pluginOptions = pluginOptions || {};

    var _this = this,
        _helper;

    this.type = pluginOptions.type;
    this.path = pluginOptions.path;

    this.generateHelper = function() {
      _helper = document.getElementById( _this.type + "-icon" ) || document.getElementById( "default-icon" );
      if( _helper ) {
        _helper = _helper.cloneNode( false );
        // Prevent two elements from having the same ID on the page
        _helper.id = null;
      }
      _this.helper = _helper;
    };

    this.createElement = function ( butter, pattern ) {
      var pluginElement;
      if ( !pattern ) {
        pluginElement = document.createElement( "span" );
        pluginElement.innerHTML = _this.type + " ";
      }
      else {
        var patternInstance = pattern.replace( /\$type/g, _this.type );
        pluginElement = LangUtils.domFragment( patternInstance );
      }
      pluginElement.id = PLUGIN_ELEMENT_PREFIX + _this.type;
      pluginElement.setAttribute( "data-popcorn-plugin-type", _this.type );
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
    };

    this.generateHelper();

  }