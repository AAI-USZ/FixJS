function(resp, xhr, options){
        if( !resp )
            return resp;
        var i, er, self = this,
            targetId = this.id,
            origResp = resp;
        var debug = options && options.debug;
        // var removeId = options && !_.isUndefined(options.removeId) ? options.removeId : false;
        var removeId = options && options.removeId;

        if( options && options.parseFor ){
            targetId = options.parseFor;
        }
        if( resp[targetId] ){
            resp = resp[targetId];
        }

        var entityDef = exports.ids[ resp.type || this.type ];

        var associateRelations = function(data, options){
            var i, er, erId, items, erName, entityDef;
            options = (options || {});
            if( !data )
                return;

            var type = data.type = data.type || options.type || self.type;

            if( !(entityDef = exports.ids[ type ]) )
                return;
            if( removeId ){
                delete data['id'];
            }

            // if( debug ) log('calling it ' + type + ' ' + JSON.stringify(entityDef.ER) );

            if( entityDef.oneToMany ){
                // TODO - maybe this should be the responsibility of the particular class...
                if( data.items ){
                    data.items = _.map( data.items, function(item){
                        item = _.isObject(item) ? item : origResp[item];
                        return associateRelations( item );
                    });
                }
            }

            for( i in entityDef.ER ){
                er = entityDef.ER[i];
                erName = (er.name || er.oneToMany || er.oneToOne ).toLowerCase();
                erId = data[erName];

                if( er.oneToOne ){
                    if( origResp[erId] ){
                        data[erName] = associateRelations( origResp[erId] );
                    }
                }
                else if( er.oneToMany && erId ){
                    if( _.isArray(erId) ){
                        // the items will either be an array of entity ids, or entities themselves
                        items = _.map( erId, function(item){
                            item = _.isObject(item) ? item : origResp[item];
                            return associateRelations( item, {type:er.oneToMany} );
                        });
                        data[erName] = { items:items };
                    } else{
                        if( origResp[erId] ){
                            data[ erName ] = associateRelations( origResp[erId] );
                        }
                        else if( erId.items ){
                            erId.items = _.map( erId.items, function(eid){
                                if( !_.isObject(eid) )
                                    return associateRelations( origResp[eid] );
                                return eid;
                            });
                        }
                    }
                }
            }
            return data;
        }
        
        // set any ER properties
        if( resp !== this ){
            associateRelations( resp );
        }

        // if( Common.debug ){
            // log('parsing');
            // print_ins( resp );
        // }
        
        return resp;
    }