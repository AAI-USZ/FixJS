function(errors){
            if(errors){ 
                //I think we should probably just log any of these errors
                platform.log("Errors downloading src attributes",errors);
            }
            scxmlJsonToModel(scxmlJson,cb);
        }