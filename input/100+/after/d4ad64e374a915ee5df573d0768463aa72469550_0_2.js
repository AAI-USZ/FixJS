function(err){
                if(!err){
                  file.comments.push(comment);
                  file.save(
                    function(err){
                      if(!err){
                        res.send(ok({comment: comment}));
                      }else{
                        res.send(notok("Could not save file comment"));
                      }
                    });
                }else{
                  console.log(err);
                }
              }