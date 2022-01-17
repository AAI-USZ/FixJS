function(err, course) {
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
              }