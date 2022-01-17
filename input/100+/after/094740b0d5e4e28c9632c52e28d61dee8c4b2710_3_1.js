f        options || (options={});
        var multi = redisHandle,
            i, len, date, status, collection, serialised,
            self = this, 
            keyPrefix = self.options.key_prefix,
            initiateMulti = redisHandle instanceof redis.RedisClient,
            key,keys,val;

        // if(options.debug) log('saving entity ' );
        // if(options.debug) print_var( entity );

        if( !entity.id ){
            // get a new id for the entity
            exports.generateUuid(function(err,id){
                if( err ) throw err;
                entity.id = id; //entity.type + '.' + id;
                entity._uuidgen = true;
                // log('saving changed entity ' + entity.id);
                // call ourselves again
                self.saveEntity( redisHandle, entity, options, callback );
            });
            // log('proceeding');
            return;
        }

        if( initiateMulti ) { //redisHandle instanceof redis.RedisClient ){

            multi = redisHandle.multi();
        } else {
            // log('not initiating multi for saveEntity');
            // print_ins( redisHandle.queue );
        }

        // update the date
        entity.updated_at = new Date();

        serialised = entity.toJSON({relationsAsId:true,relations:false,debug:options.debug});
        serialised.type = entity.type;
        delete serialised.id;
        if( options.debug ) log( 'saving serialised: ' + JSON.stringify( serialised ) );

        key = keyPrefix + ':' + entity.id;
        var entityHashFields = Common.config.sync.redis.entity_hset;

        // convert date fields to times (for sorting purposes)
        /*if( entity.created_at ){
            multi.hmset( key, 'created_at', new Date(entity.created_at).getTime() );
        }

        if( entity.updated_at ){
            multi.hmset( key, 'updated_at', new Date(entity.updated_at).getTime() );
        }//*/

        // add entity fields to entity hash
        _.each( entityHashFields, function(field){
            if( entity[field] )
                multi.hmset( key, field, entity[field] );
        });


        // if the entity has specific keys it wants as fields, then apply so now
        // log("WAAAH " + entity.storeKeys() );
        if( entity.storeKeys ){
            keys = entity.storeKeys();
            for( i=0,len=keys.length;i<len;i++ ){
                if( (val = serialised[keys[i]]) || (val = entity[keys[i]]) ){
                    if( _.isDate(val) )
                        val = val.getTime();
                    multi.hmset( key, keys[i], val );
                }
            }
        }

        multi.hmset(key, 'value', JSON.stringify(serialised) ); //JSON.stringify(value) );

        // entity status index
        status = entity.get('status');

        for( i in Common.Status ){
            // status = entity.get('status') || entity.status;
            if( status === Common.Status[i] )
                multi.sadd( keyPrefix + ':status:' + Common.Status[i], entity.id );
            else
                multi.srem( keyPrefix + ':status:' + Common.Status[i], entity.id );
            // log(entity.id + ' ' + Common.Status[i] );
        }

        // NOTE : logically deleting something does not remove from type and collection sets
        // - retrieving usually 
        // if( status === Common.Status.LOGICALLY_DELETED ){
        //     multi.srem( keyPrefix + ':' + entity.type, entity.id );
        //     if( entity.entityCollection ){
        //         if( options.debug ) log('removing from entityCollection set');
        //         multi.srem( keyPrefix + ':' + entity.entityCollection.id + ':items', entity.id );
        //     }
        // } else {
            // add to entity type set
        // if( options.debug && entity.id === 'foxtrot_2' ) print_ins( entity );//log('well heck ' + entity.entityCollection);

            multi.sadd( keyPrefix + ':' + entity.type, entity.id );
            if( (collection = entity.entityCollection) ){
                if( options.debug ) log('adding to entityCollection set ' + entity.id);
                // if( options.debug ) print_ins( entity );
                // multi.sadd( keyPrefix + ':' + entity.entityCollection.id + ':items', entity.id );
                multi.sadd( keyPrefix + ':' + collection.getStoreId() + ':' + collection.getName() || 'items', entity.id );
            }
        // }


        // if( options.collectionSetKey )
            // multi.sadd( options.collectionSetKey, entity.id );

        if( initiateMulti ) {//redisHandle instanceof redis.RedisClient ){
            // if( options.debug ) log('ok done!');
            // log( multi.exec );
            // multi.sadd( keyPrefix + ':poobum', 'bingo');
            multi.exec( function(err, replies){
                callback( err, entity );
            });
            // if( options.debug ) log('ok done!');
        } else {
            // log('well no');
        }

        if( callback ){
            callback( null, entity );
        }
    },
