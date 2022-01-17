function(index, oldPos, newPos, isLocal){

          if( isLocal ){ return; } // don't trigger if we moved it (since we're already up-to-date)

          if( newPos.x === undefined || newPos.y === undefined ){
            newPos = oldPos;
          }

          var id = model.get('_entities.' + index + '.id');
          fn(id, newPos);
        }