function( name, config ) {
      if( this._stopLoading ) {
        throw new Error( "Stop loading " + name );
      }
      try {
        config = this._normalizeConfig( config );
        this.__validateConfig( name, config );
        var clazz;
        if( !config.extend ) {
          clazz = config.statics || {};
        } else {
          if( !config.construct ) {
            config.construct = this.__createDefaultConstructor();
          }
          clazz = this.__wrapConstructor(config.construct, name, config.type);
          if( config.statics ) {
            var key;
            for( var i = 0, a = qx.lang.Object.getKeys( config.statics ), l = a.length; i < l; i++ ) {
              key = a[ i ];
              clazz[ key ] = config.statics[ key ];
            }
          }
        }
        var basename = this.createNamespace( name, clazz, false );
        clazz.name = clazz.classname = name;
        clazz.basename = basename;
        this.__registry[ name ] = clazz;

        // Attach toString
        if( !clazz.hasOwnProperty( "toString" ) ) {
          clazz.toString = this.genericToString;
        }

        if( config.extend ) {
          var superproto = config.extend.prototype;
          var helper = this.__createEmptyFunction();
          helper.prototype = superproto;
          var proto = new helper();
          clazz.prototype = proto;
          proto.name = proto.classname = name;
          proto.basename = basename;
          config.construct.base = clazz.superclass = config.extend;
          config.construct.self = clazz.constructor = proto.constructor = clazz;
          if( config.destruct ) {
            clazz.$$destructor = config.destruct;
          }
          var that = this;
          clazz.$$initializer = function() {
            //console.log( "init " + name );
            if( config.properties ) {
              that.__addProperties(clazz, config.properties, true);
            }
            if( config.members ) {
              that.__addMembers(clazz, config.members, true, true, false);
            }
            if( config.events ) {
              that.__addEvents(clazz, config.events, true);
            }
            if( config.include ) {
              for (var i=0, l=config.include.length; i<l; i++) {
                that.__addMixin(clazz, config.include[i], false);
              }
            }
          };
        }
        if( config.variants ) {
          for (var key in config.variants) {
            qx.core.Variant.define(key, config.variants[key].allowedValues, config.variants[key].defaultValue);
          }
        }
        if( config.defer ) {
          this.__initializeClass( clazz );
          config.defer.self = clazz;
          config.defer(clazz, clazz.prototype, {
            add : function( name, config ) {
              var properties = {};
              properties[name] = config;
              qx.Class.__addProperties(clazz, properties, true);
            }
          } );
        }
      } catch( ex ) {
        alert( "Error loading class " + name + ": " + ( ex.message ? ex.message : ex ) );
        this._stopLoading = true;
        throw ex;
      }
    }