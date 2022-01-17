function(err, course){
        if(!err){
          if(course){
            if(req.body.type = 'staff'){
              course.staff.push(req.body.userid);
              course.save(function(err){
                if(!err){
                  res.send(ok({user: req.body.userid}));
                }else{
                  console.log(err);
                }
              });
            }else if(req.body.type = 'student'){
              course.students.push(req.body.userid);
              course.save(function(err){
                if(!err){
                  res.send(ok({user: req.body.userid}));
                }else{
                  console.log(err);
                }
              });
            }else{
              res.send(notok("Invalid user type"));
            }
            res.send(ok({user: req.body.userid}));
          }else{
            res.send(notok("Course not found"));
          }
        }else{
          console.log(err);
        }
      }