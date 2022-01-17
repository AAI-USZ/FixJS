function(err,id){
        if( options.entity ){
            options.entity.id = id;
            options.entity._uuidgen = true;
        }
        callback(err,id,options);
    }