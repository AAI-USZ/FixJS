function(err,s){
            if(err){
                cb(err);
            }else{
                try{
                    var doc = parseDocumentFromString(s);
                    cb(null,doc);
                }catch(e){
                    cb(e);
                }
            }
        }