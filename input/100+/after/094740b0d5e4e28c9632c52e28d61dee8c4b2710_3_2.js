function(model, options, callback) {
        var self = this,i;
        var keyPrefix = self.options.key_prefix;
        var entityDetails = Common.entity.ids[model.type];        
        var collectionSetKey;
        var cidToModel,entity;


        var multi = self.client.multi();
        // flatten the collection and any contained models
        var cidToModel = model.flatten();

        // log('redis.update with ' + JSON.stringify(options) );
        // if( options.debug ) print_var( cidToModel );
        // if( options.debug ) process.exit();
        
        Step(
            function ensureIds(){
                var group = this.group();
                for( i in cidToModel ){
                    entity = cidToModel[i];
                    if( entity.isNew() ){
                        exports.generateUuid({entity:entity}, group() );
                    }
                }
            },
            function saveEntities(){
                var group = this.group();
                for( i in cidToModel ){
                    entity = cidToModel[i];
                    self.saveEntity( multi, entity, options, group() );
                    // log('saved entity ' + i );
                }
            },
            function executeStatements(err, result){
                if( err ) throw err;
                multi.exec( this );
            },
            function(err,replies){
                if( options.debug ) log('entity id is now ' + model.id + '(' + model.cid + ')');
                callback(err, model);
            }
        );//*/
        /*


        var assignIdToEntity = function(entity, callback){
            exports.generateUuid( function(err,id){
                entity.id = id; //entity.type + '.' + id;
                callback(null,entity);
            });
        };

        // save each of the models first - this is to ensure they have a valid id
        Step(
            function(){
                // A build a map of model cids to models, so that we can later update ids if need be
                var factoryOptions = {toJSON:false,exportAsMap:true};
                if( options.saveRelated ) factoryOptions.exportRelations = true;
                cidToModel = Common.entity.Factory.toJSON( model, factoryOptions );

                // check the models have ids, if not then generate some for them
                var group = this.group();

                _.each( cidToModel, function(ent){
                    if( ent.isNew() ){
                        assignIdToEntity(ent,group());
                    }
                });
                // 
            },
            function saveEntities(){
                // print_ins(cidToModel,false,3);
                // referenceChildren means that the parents will have references to children
                var jsonOutput = Common.entity.Factory.toJSON( cidToModel, {referenceItems:false,special:true} );

                // print_var(jsonOutput);
                var group = this.group();
                _.each( jsonOutput, function(ent){
                    self.saveEntity( self.client, ent, options, group() );
                });
            },
            function saveEntityERs(err,replies){
                // check for updated ids from the save operation
                // _.each( replies, function(ent){
                    // B set the id on the original models if required
                // });

                // log('saveEntityERs saveEntity multi ');
                // print_var(replies);
                var multi = self.client.multi();
                // one to many relationships will be stored in a set
                _.each( entityDetails.ER, function(er){
                    if( er.oneToMany ){
                        var key = er.name || er.oneToMany;
                        key = key.toLowerCase();

                        collectionSetKey = [keyPrefix,model.id,key].join(':');
                        model[key].each( function(child){
                            multi.sadd( collectionSetKey, child.id );
                        });
                    }
                });

                multi.exec(this);
            },
            function(err,replies){
                // print_ins(model.test_b.at(0).id);
                // process.exit();
                callback(err,model);
            }
        );//*/

        return model;
    }