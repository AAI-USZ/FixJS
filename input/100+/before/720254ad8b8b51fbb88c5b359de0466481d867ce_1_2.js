function(err, doc) {
    model.ref('_doc', doc);
    model.ref('_entities', '_doc.entities');

    // provide an easy way to get the index of entities
    model.fn('_entityIdToIndex', '_entities', function(entities){
      var id2index = {};

      if( entities ){
        for( var i = 0; i < entities.length; i++ ){
          var entity = entities[i];
          id2index[ entity.id ] = i;
        }
      }

      return id2index;
    });

    // provide an easy way to get entities by id
    model.fn('_entity', '_entities', function(entities){
      var id2ent = {};

      if( entities ){
        for( var i = 0; i < entities.length; i++ ){
          var entity = entities[i];
          id2ent[ entity.id ] = entity;
        }
      }

      return id2ent;
    });

    // provide an easy way to get entities with references to other entities flattened
    model.fn('_populatedEntities', '_entities', function(entities){
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
          var entity = entities[i];
          popd.push(entity);

          if( entity.interaction && entity.participantIds ){
            var pids = entity.participantIds;
            var parts = entity.participants = [];
            var hasEntity = {};

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
    });

    // provide an easy way to get entities 
    model.fn('_participantsFor', '_entities', function(entities){
      var pfor = {};

      if( entities ){
        var id2ent = {};

        // set up id2ent map
        for( var i = 0; i < entities.length; i++ ){
          var entity = entities[i];
          id2ent[ entity.id ] = entity;
        }

        // get the participants
        for( var i = 0; i < entities.length; i++ ){ 
          var entity = entities[i];

          if( entity.interaction && entity.participantIds ){
            var pids = entity.participantIds;
            var parts = pfor[ entity.id ] = [];

            for( var j = 0; j < pids.length; j++ ){
              var pid = pids[j];
              var part = id2ent[ pid ];

              parts.push( part );
            }
          }
        }
      }

      return pfor;
    });

    var useQunit = params.query.qunit !== undefined; // e.g. /?qunit=true or /?qunit
    if( useQunit ){
      model.set('_useQunit', true);
      return page.render('qunit', {
        scripts: [ 'doc' ]
      });
    } else {
      model.set('_useQunit', false);
      return page.render();
    }

  }