function(req, res) {
      m.Assignment.findById(req.params.assignid).populate('files').exec(
        function(err, assignment){
          if(!err){
            if(assignment){
              files = _.map(assignment.files,
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
        });
    }