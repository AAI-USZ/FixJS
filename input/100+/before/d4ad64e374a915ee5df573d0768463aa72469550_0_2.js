function(err, file){
          if(!err){
            if(file){
              var comment = new m.Comment();
              comment.text = req.body.text;
              comment.user = req.body.user;
              comment.timestamp = req.body.timestamp;
              comment.startLine = req.body.startLine;
              comment.startChar = req.body.startChar;
              comment.endLine = req.body.endLine;
              comment.endChar = req.body.endChar;
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
              res.send(notok("File not found"));
            }
          }else{
            console.log(err);
          }
        }