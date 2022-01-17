function( attrs, options ){
        // if( !attrs ){
        //     print_ins( arguments );
        //     print_stack();
        // }
        if( attrs.type ){
            var result = entity.create( attrs, options );
            return result;
        }
        return new Backbone.Model( attrs, options );
    }