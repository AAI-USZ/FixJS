function( entity, options, callback ){
        var self = this, i, er, name, type, key, targetId;
        var entityId = _.isObject(entity) ? entity.id : entity;
        var entityKey = options.key_prefix + ':' + entityId;
        var ldlKey = options.key_prefix + ":status:" + Common.Status.LOGICALLY_DELETED;
        var entityDef;// = Common.entity.ids[entity.type];
        var ignoreStatus = _.isUndefined(options.ignoreStatus) ? false : options.ignoreStatus;

        if(options.debug) log('retrieveEntityById ' + entityId + ' ' + entityKey + ' options: ' + JSON.stringify(options) );

        var multi = self.client.multi();

        // check that this entity is not logically deleted
        multi.sismember( ldlKey, entityId );
        multi.hget( entityKey, 'value' );

        // retrieve the entity
        multi.exec( function(err, replies){
            if( err ) throw err;

            if( (!ignoreStatus && replies[0]) || !replies[1] ){
                callback(entityId + ' not found');
                return;
            }
            
            var entityAttr = JSON.parse( replies[1] );
            entityAttr.id = entityId;

            type = entityAttr.type || (_.isObject(entity) ? entity.type : null);
            // delete entityAttr.type;
            entityDef = Common.entity.ids[type];

            if( !options.fetchRelated ){
                callback( null, entityAttr );
                return;
            }

            if(options.debug ) log('hmm plinkyplonk ' + JSON.stringify(entityDef) );
            
            // look for other relations that we should retrieve
            // if there are any collections associated with this entity then fetch their details
            if( entityDef.oneToMany ){
                // this is a collection - look for members
                // log('looking for members of ' + entityKey + ':items' );
                options.fetchSetList.push( {key:entityKey + ':items', callback:function(result){
                    entityAttr.items = result;
                }});
            }
            else if( entityDef.ER ){
                for( i in entityDef.ER ){
                    er = entityDef.ER[i];
                    if( er.oneToMany ){
                        name = (er.name || er.oneToMany).toLowerCase();
                        targetId = entityAttr[name];
                        // key = entityKey + ':' + name;
                        // if(options.debug ) log('err ' + name )
                        if( targetId ){
                            if( (options.fetchRelated || options._depth < options.depth) && !options.result[targetId] ){
                                // erCollections.push( name );
                                if( options.debug ) log('2 adding ' + name + ' ' + targetId );
                                options.fetchList.push( targetId );
                            }
                        } else {
                            // look for set members
                            options.fetchSetList.push( {key:entityKey + ':' + name, callback:function(result){
                                entityAttr[name] = result;
                            }});
                        }
                    }
                    else if( er.oneToOne ){
                        name = (er.name || er.oneToOne).toLowerCase();
                        targetId = entityAttr[name];
                        // key = entityKey + ':' + name;
                        // log('considering ' + o2oName  + ' type ' + er.oneToOne );
                        if( targetId && (options.fetchRelated || options._depth < options.depth) && !options.result[targetId] ){
                            // erEntities.push( { key:name, type:er.oneToOne} );
                            if( options.debug ) log('3 add ' + targetId + ' to fetchList' );
                            options.fetchList.push( targetId );
                        }
                    }
                }
            }

            callback( null, entityAttr );
        });
    }