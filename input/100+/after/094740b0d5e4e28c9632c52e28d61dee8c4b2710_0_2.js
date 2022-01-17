function(data, options){
            var i, er, erId, items, erName, entityDef;
            options = (options || {});
            if( !data )
                return;

            var type = data.type || options.type || self.type;

            if( !_.isUndefined(type) ) 
                data.type = type;

            if( !(entityDef = (options.entityDef || exports.ids[ type ])) )
                return;
            if( removeId ){
                delete data['id'];
            }

            // if( options.debug ) log('calling it ' + type + ' ' + JSON.stringify(options) );
            // if( options.debug ) print_var( data );
            // if( options.debug ) print_var( entityDef );

            if( options.isCollection ){
                // this part of data has been flagged as being a collection instance
                // it may contain attributes of its own, and will have a list of entity ids keyed to either
                // the collection name, or a generic 'items' name
                key = 'items';
                if( data[ entityDef.name ] )
                    key = entityDef.name;                

                if( data[ key ] ){
                    data.items = _.map( data[ key ], function(item){
                        item = _.isObject(item) ? item : origResp[item];
                        return associateRelations( item );
                    });
                    if( data[ entityDef.name ] )
                        delete data[ entityDef.name ];
                }
                delete data.type;
                return data;
            }

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
                            // log('assoc ' + JSON.stringify(er) );
                            data[ erName ] = associateRelations( origResp[erId], {isCollection:true,entityDef:er,debug:true} );
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