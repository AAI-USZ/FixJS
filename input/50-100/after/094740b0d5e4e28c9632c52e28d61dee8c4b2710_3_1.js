function(err,id){
        if( options.entity ){
            if( options.entity.set )
                options.entity.set('id', id);
            else
                options.entity.id = id;
            options.entity._uuidgen = true;
        }
        callback(err,id,options);
    }