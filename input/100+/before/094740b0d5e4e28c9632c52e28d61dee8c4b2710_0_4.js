function( options ){
        var i, entityDef, er, erName, relation;
        options || (options = {});
        var doRelations = _.isUndefined(options.relations) ? true : options.relations;//options.relations;
        var relationsAsId = options.relationsAsId;
        var returnDefaults = options.returnDefaults;
        
        // clone the attributes into the result objects
        var attrs = this.attributes, result = {};
        for (var prop in attrs) {
            // TODO - rewrite ER checking inside this loop
            result[prop] = attrs[prop];
        }
        // var result = Backbone.Model.prototype.toJSON.apply( this, arguments );

        // if( !result )
            // return {};

        // if( options.debug ) log('1st ' + JSON.stringify(result) );
        // if( !result )
        //     print_ins(this);
        // log('toJSON for ' + this.type );
        // print_ins(this.teams,false,3);
        if( this.type ){
            entityDef = Common.entity.ids[this.type];
            // log( this.type + ' relations: ' + JSON.stringify(entityDef) );

            for( i in entityDef.ER ){
                er = entityDef.ER[i];
                erName = (er.name || er.oneToMany || er.oneToOne ).toLowerCase();
                // def = Common.entity.ids[ er.type ];
                if( options.debug ) log('entity.toJSON: ' + erName + ' ' + JSON.stringify(er) );

                if( er.oneToOne ){
                    // if( options)
                    relation = result[erName];

                    if( !relation )
                        continue;
                    // if( options.debug ) log('o2o ' + erName );
                    if( !relation.isNew() && relationsAsId )
                        result[erName] = relation.id;
                    else if( doRelations )
                        result[erName] = relation.toJSON();
                    else
                        delete result[erName];
                } else if( er.oneToMany ){
                    relation = this[erName];
                    if( !relation )
                        continue;

                    if( !relation.isNew() && relationsAsId )
                        result[erName] = relation.id;// || this[erName].cid;
                    else if( doRelations ) {
                        // print_ins( this[erName].toJSON() );
                        result[erName] = relation.toJSON();
                    }
                }
            }
        }

        

        if( !returnDefaults ){
            _.each( this.defaults, function(val,key){
                // log('look ' + key + ' ' + result );
                if( result[key] === val )
                    delete result[key];
            });
        }

        if( options.noDates ){
            delete result.created_at;
            delete result.updated_at;
        }

        if( options.refCount )
            result.refCount = this.refCount;

        if( this.type )
            result.type = this.type;

        return result;
    }