function(app) {
  var models = require('../models'),
    _ = require('lodash');
  app.delete('/dev/delete', function(req, res) {
      models.User.remove({}, function(err) {
          console.log(err);
      });
      models.Assignment.remove({}, function(err) {
          console.log(err);
      });
      models.File.remove({}, function(err) {
          console.log(err);
      });
      models.Course.remove({}, function(err) {
          console.log(err);
      });
      models.Comment.remove({}, function(err) {
          console.log(err);
      });
      res.send("deleted");
  });

  app.post('/dev/populate', function(req, res) {
      var sri = new models.User(),
          iev = new models.User(),
          drl = new models.User(),
          rafee = new models.User(),
          assn09 = new models.Assignment(),
          c15150 = new models.Course(),
          fundict = new models.File(),
          serializable = new models.File(),
          ordered = new models.File();
      sri.name = "Sri";
      sri.password = ".";
      sri.email = "srikrish@andrew.cmu.edu";
      sri.save(function(e) { if(e) {console.log(err);}});
      rafee.name = "Rafee";
      rafee.password = "rafeetalks";
      rafee.email = "rafee@palantir.com";
      rafee.save(function(e) { if(e) {console.log(err);}});
      iev.name = "Ian";
      iev.password = "ianleaves";
      iev.email = "iev@cs.cmu.edu";
      iev.save(function(e) { if(e) {console.log(err);}});
      drl.name = "Dr. Dan";
      drl.password = "root";
      drl.email = "drl@cs.cmu.edu";
      drl.save(function(e) { if(e) {console.log(err);}});

      c15150.name = "15-150";
      c15150.slug = "15-150";
      c15150.assignments.push("assn09");
      c15150.staff.push(iev._id);
      c15150.staff.push(drl._id);
      c15150.students.push(sri._id);
      c15150.save(function(err) {
          if(err) {console.log(err);}
      });

      fundict.name = "fundict.sml";
      fundict.slug = "fundict.sml";
      fundict.path =
          application_root + "/data/handins/srikrish/15150/assn09/fundict.sml";
      fundict.timestamp = new Date();
      fundict.save(function(e) { if(e) {console.log(err);}});
      ordered.name = "ordered.sml";
      ordered.slug = "ordered.sml";
      ordered.path =
          application_root + "/data/handins/srikrish/15150/assn09/ordered.sml";
      ordered.timestamp = new Date();
      ordered.save(function(e) { if(e) {console.log(err);}});
      serializable.name = "serializable.sml";
      serializable.slug = "serializable.sml";
      serializable.path =
          application_root+"/data/handins/srikrish/15150/assn09/serializable.sml";
      serializable.timestamp = new Date();
      serializable.save(function(e) { if(e) {console.log(err);}});

      assn09.name = "Assignment 09";
      assn09.slug = "assn09";
      assn09.course = c15150._id;
      assn09.user = sri._id;
      assn09.files.push(fundict._id);
      assn09.files.push(ordered._id);
      assn09.files.push(serializable._id);
      assn09.save(function(e) { if(e) {console.log(err);}});

      sri.assignments.push(assn09._id);
      sri.save(function(e) { if(e) {console.log(err);}});

      res.send("OK");
  });

  app.get('/', function(req, res) {
    if (req.user) {
      var userid = req.user._id;
      models.Course
      .find({})
      .or([{staff: userid},
           {students: userid}])
      .exec(function(err, courses) {
        res.render('index', {
          courses: _(courses).map(function (course) {
            return {
              name: course.name,
              slug: course.slug,
              is_staff: _(course.staff).contains(userid)
            };
          })
        });
      });
    } else {
      res.end("Splash page");
    }
  });
}