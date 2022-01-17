function(tx, r){
              //console.log("out of range?????===========")
              //console.log(r);
          if(r.rows.length){
                  deferred.resolve(true);
          }else{
                deferred.reject("no sid");
          }                
        }