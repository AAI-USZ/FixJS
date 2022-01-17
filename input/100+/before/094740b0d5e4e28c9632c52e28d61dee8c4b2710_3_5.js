function(model, options, callback) {
        var i, self = this,
            item, entityId,
            collectionSetKey,
            result;
        var entityDetails = Common.entity.ids[model.type];
        
        var retrieveChildren = [];
        var itemCounts = [];
        var modelKey = [self.options.key_prefix, model.id].join(':');
        var ldlKey = options.key_prefix + ":status:" + Common.Status.LOGICALLY_DELETED;

        if( options.ignoreStatus )
            ldlKey = null;

        options._depth = options._depth || 1;
        // the fetchList contains entity ids which should be retrieved
        options.fetchList = [ model.id ];
        // the fetchSetList contains details of sets (of entity ids) which should be retrieved
        options.fetchSetList = [];
        options.result = {};

        /*
        if( model instanceof Common.entity.EntityCollection ){
            if( !model.id ){
                this.retrieveCollectionByType( model, options, callback );
            }
            else{
                this.retrieveCollectionById( model,options,callback);
            }
        }
        else {
            self.retrieveEntityById( model, options, callback );
        }//*/

        var evalFetchList = function(){
            if( options.fetchSetList.length > 0 ){
                item = options.fetchSetList.shift();
                if( _.isObject(item) ){
                    self.client.sdiff( item.key, ldlKey, function(err,result){
                        if( err ) throw err;
                        if( options.debug ) log('result of set ' + item.key + ' ' + JSON.stringify(options) );
                        // add the member IDs to the list of entities that should also be retrieved
                        if( options.fetchList ){
                            for( i in result ){
                                // only add to list to be fetched if we haven't already seen it
                                if( result[i] && !options.result[result[i]] ){
                                    if( options.debug ) log('1 add ' + result[i] + ' to fetchList' );
                                    options.fetchList.push( result[i] );
                                }
                            }
                        }

                        if( item.callback ){
                            item.callback( result );
                        }

                        // re-check if we need to fetch anything
                        evalFetchList();
                    });
                }
            } else if( options.fetchList.length > 0 ) {
                // pull the next
                entityId = options.fetchList.shift();
                if( options.debug ) log('going for retrieve of ' + entityId );
                self.retrieveEntityById( entityId, options, function(err,data){
                    if( err ){
                        // TODO : will it always matter that a model cant be found?
                        callback( err );
                        return;
                    }
                    // store result
                    options.result[ entityId ] = data;
                    // re-check if we need to fetch anything
                    evalFetchList();
                });
            } else {
                if( options.debug ) log('finished fetchList retrieve');
                if( options.debug ) print_var( options.result );
                callback( null, options.result );
            }
        };

        evalFetchList();

        // this.retrieveEntityById( model, options, function(err,data){
        //     log( 'fetchList is now ' + JSON.stringify(options.fetchList) );
        //     callback( err, data );
        // });
    }