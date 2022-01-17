function( id, pluginOptions ){
    pluginOptions = pluginOptions || {};

    var _id = "plugin" + id,
        _this = this,
        _name = pluginOptions.type,
        _path = pluginOptions.path,
        _manifest = {},
        _type = pluginOptions.type,
        _element;

    if( _path ) {
      var head = document.getElementsByTagName( "HEAD" )[ 0 ],
          script = document.createElement( "script" );

      script.src = _path;
      head.appendChild( script );
    } //if

    Object.defineProperties( this, {
      id: {
        enumerable: true,
        get: function() {
          return _id;
        }
      },
      name: {
        enumerable: true,
        get: function() {
          return _name;
        }
      },
      path: {
        enumerable: true,
        get: function() {
          return _path;
        }
      },
      manifest: {
        enumerable: true,
        get: function() {
          return _manifest;
        },
        set: function( manifest ) {
          _manifest = manifest;
        }
      },
      type: {
        enumerable: true,
        get: function() {
          return _type;
        }
      },
      helper: {
        enumerable: true,
        get: function(){
          return _helper;
        }
      }
    });

    _helper = document.getElementById( _this.type + "-icon" ) || document.getElementById( "default-icon" );
    
    if(!_helper) {
      _helper = document.createElement("img");
      _helper.src = "../resources/popcorn-icon.png";
    }

    console.log(_helper);
    this.createElement = function ( pattern ) {
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
    }; //createElement

  }