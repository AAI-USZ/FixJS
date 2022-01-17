function(a) {
                                      console.log(a);
                                      if(a.slug === req.params.assignslug &&
                                        a.course == req.params.courseid) {
                                          console.log(a);
                                          ass.push(a);
                                      }
                                  }