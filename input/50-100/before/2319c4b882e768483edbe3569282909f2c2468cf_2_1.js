function(tx, r){
              console.log("out of range?????===========")
              console.log(r);
          if(r.rowsAffected){
              var result=r.rows.item(0);
                  deferred.resolve(true);
          }else{
                deferred.reject("no sid");
          }                
        }