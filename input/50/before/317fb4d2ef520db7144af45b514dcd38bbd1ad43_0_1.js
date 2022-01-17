function(errors){
            if(errors){ 
                //I think we should probably just log any of these errors
                console.error("Errors downloading src attributes");
            }
            scxmlJsonToModel(scxmlJson,cb);
        }