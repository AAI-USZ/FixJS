function( attrs, options ){
        if( options && options.collection && options.collection.entityCollection ){
            if( !attrs.type )
                attrs.type = options.collection.entityCollection.entityType;
        }

        if( attrs.type ){
            var result = entity.create( attrs, options );
            return result;
        }

        return new Backbone.Model( attrs, options );
    }