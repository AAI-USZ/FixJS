function(error, result) {
        if (error) console.log(error);
        var getUniqueId = function(){
            var rand=0;
            while(true){
                rand=(Math.floor(Math.random()*1000)+(new Date()).getTime()).toString(16);
                if(db.images.findOne({a:rand},{_id:1})) {
                    continue;}else{break;}
            }
            return rand;
        };
        db.eval('var func = '+getUniqueId.toString()+' db.code.insert({"_id" : "getUniqueId", "value" : func });', function(error, result) {

        });
    }