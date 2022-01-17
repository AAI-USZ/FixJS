function(entities){
      var popd = [];

      if( entities ){
        var id2ent = {};

        // set up id2ent map
        for( var i = 0; i < entities.length; i++ ){
          var entity = entities[i];
          id2ent[ entity.id ] = entity;
        }

        // get the participants
        for( var i = 0; i < entities.length; i++ ){ 
          var entity = {}; // don't change the original obj by making a copy
          for( var j in entities[i] ){
            entity[j] = entities[i][j];
          }

          popd.push(entity);

          if( entity.interaction && entity.participantIds ){ // then we need to flatten entity refs
            var pids = entity.participantIds;
            var parts = entity.participants = [];
            var hasEntity = entity.hasEntity = {};

            for( var j = 0; j < pids.length; j++ ){
              var pid = pids[j];
              var part = id2ent[ pid ];

              hasEntity[ pid ] = true;
              parts.push( part );
            }
          }
        }
      }

      return popd;
    }