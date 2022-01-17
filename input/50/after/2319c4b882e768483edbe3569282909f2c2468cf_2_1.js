function(tx, r){
          //console.log(r);
            if(r.rows.length){
                var result=r.rows.item(0);
                    deferred.resolve(result.base64);
            }else{
                  deferred.reject(r);
            }             
        }