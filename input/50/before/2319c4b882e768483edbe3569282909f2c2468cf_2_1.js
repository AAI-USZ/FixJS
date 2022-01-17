function(tx, r){
            if(r.rowsAffected){
                var result=r.rows.item(0);
                    deferred.resolve(result.base64);
            }else{
                  deferred.reject(r);
            }             
        }