function(app) {
  var authUtils = require('../authUtil'),
      m = require('../models'),
      _ = require('lodash'),
      fs = require('fs'),
      async = require('async'),
      ok = function(d) {
          return {status: "Success", data: d};
      },
      notok = function(d) {
          return {status: "Failure", message: d};
      };

  app.get('/api/user/:userid/course/:courseid', //authUtils.ensureAuthenticated,
    function(req, res) {
      m.Course.findById(req.params.courseid).exec(function (err, doc) {
        if(!err) {
          if(doc) {
            if(_.find(doc.staff,
              function(u) {return (u == req.params.userid);})) {
                res.send(ok({isStaff: true}));
              } else {
                res.send(ok({isStaff: false}));
              }
          } else {
            res.send(notok("Document not found."));
          }
        } else {
          console.log(err);
        }
      });
    });

  app.get('/api/user/:userid/course', //authUtils.ensureAuthenticated,
    function(req, res) {
      m.Course.find({}).or([{staff: req.params.userid},
                   {students: req.params.userid}]).exec(
        function(err, courses){
          if(!err){
            if(courses){
              res.send(ok({courses: courses}));
            }else{
              res.send(notok("Courses not found"));
            }
          }else{
            console.log(err);
          }
        });
    });


  app.post('/api/user/:userid/course', //authUtils.ensureAuthenticated,
    function(req, res) {
      var c = new m.Course(),
          u = {'_id':req.params.userid};// = req.user;
      c.name = req.body.name;
      c.slug = req.body.slug;
      c.staff.push(u._id);
      c.save(function(err) {
          if (!err) {
              res.send(ok({course: c}));
          } else {
              console.log(err);
              res.send(notok("Saving course failed!"));
          }
      });
    });


  app.get('/api/user/:userid/course/:courseid/assignments',
          //authUtils.ensureAuthenticated,
         function(req, res) {
             console.log(req.params);
             // if(req.params.userid != req.user._id) {
             //     res.send(notok("Userid does not match user logged in."));
             // }
             m.User.findById(req.params.userid).populate('assignments')
                 .exec(function(err, user){
                     console.log(user);
                     var ass;
                     if(!err) {
                         ass = _.filter(user.assignments, function(e) {
                             console.log(e.course);
                             return (e.course == req.params.courseid);
                         });
                         console.log(ass);
                         res.send(ok({"assignments": ass}));
                     } else {
                         console.log(err);
                         res.send(notok("not ok."));
                     }
                 });
  });

  app.get('/api/user/:userid/course/:courseid/assignments/:assignid', //authUtils.ensureAuthenticated,
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
    });

  app.get('/api/course/:courseid/assignments/:assignslug',
         //authUtils.ensureAuthenticated,
          function(req, res) {
              m.Course.findById(req.params.courseid).populate('students')
              .exec(function(err, course) {
                  var ass = [];
                  var funcs = _.map(course.students, function(s) {
                      return function(cb) {
                          m.User.findById(s).populate('assignments')
                              .exec(function (err, u) {
                                  _.map(u.assignments, function(a) {
                                      if(a.slug === req.params.assignslug) {
                                          console.log(a);
                                          ass.push(a);
                                      }
                                  });
                                  return cb();
                              });
                      };
                  });
                  async.parallel(funcs, function(err, results) {
                      if(!err) {
                          res.send(ok({assignments: ass}));
                      } else {
                          res.send(notok("ERROR"+err));
                      }
                  });
              });

    });


  app.get('/api/file/:fileid/comments', //authUtils.ensureAuthenticated,
    function(req, res) {
      m.File.findById(req.params.fileid).populate('comments').exec(
        function(err, file){
          if(!err){
            if(file){
              res.send(ok({comments: file.comments}));
            }else{
              res.send(notok("File not found"));
            }
          }else{
            console.log(err);
          }
        });
    });

  app.post('/api/file/:fileid/comments', //authUtils.ensureAuthenticated,
    function(req, res) {
      m.File.findById(req.params.fileid,
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
        });
    });

  app.get('/review', function(req, res) {
    res.render('review');
  });
}