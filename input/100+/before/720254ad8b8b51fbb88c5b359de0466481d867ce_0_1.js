function( entity ){
      var fn = arguments[0];
      if( isFunction( fn ) ){ // then bind to when an entity is added to the doc
        model.on('push', '_entities', function(entity, index, isLocal){
          fn( entity );
        });
        return;

      } else { // then add the entity to the doc
        if( !entity ){ // in case nothing specified
          entity = {};
        }

        if( !entity.type ){ // in case type is elided
          entity.type = "entity";
        }

        if( !entity.name ){ // in case name is elided, use some default value
          entity.name = "new entity";
        }

        entity.entity = true;

        if( !entity.viewport ){
          entity.viewport = {
            x: 0,
            y: 0
          };
        }

        if( entity.id === undefined ){ // then generate an id for the entity
          entity.id = model.id();
        }

        model.push( "_entities", entity );
      }

      return entity.id;
    }