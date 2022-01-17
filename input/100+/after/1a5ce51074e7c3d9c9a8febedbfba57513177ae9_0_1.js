function(err, assignment){
          console.log(assignment.files);
          console.log(assignment);
          if(!err){
            if(assignment){
              console.log(assignment.files);
              var files = _.map(assignment.files,
                function(file){
                  return {name: file.name,
                          timestamp: file.timestamp,
                          contents: fs.readFileSync(file.path, 'utf8')};
                });
              res.send(ok({files: files}));
            }else{
              res.send(notok("Assignment not found"));
            }
          }else{
            console.log(err);
          }
        }