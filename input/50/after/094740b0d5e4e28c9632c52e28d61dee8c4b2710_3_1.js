function(err,replies){
                if( options.debug ) log('entity id is now ' + model.id + '(' + model.cid + ')');
                callback(err, model);
            }