function(app) {
  var models = require('../models'),
    auth = require('../authUtil'),
    _    = require('lodash');

  app.get('/:courseid/:assnid', function(req, res) {
    var courseid = req.params.courseid,
      assnid = req.params.assnid;
    models.Course.findOne({ slug: courseid }, function (err, course) {
      models.Assignment
      .findOne({ slug: assnid })
      .populate('files')
      .exec(function (err, assn) {
        res.render('browse/assignment', {
          course:   { name: course.name, slug: course.slug },
          assn:     { name: assn.name, slug: assn.slug },
          files:    _(assn.files).map(function (file) {
            return { name: file.name, slug: file.slug };
          })
        });
      });
    })
  });

  app.get('/:courseid', function(req, res) {
    var courseid = req.params.courseid;
    models.Course.findOne({ slug: courseid }, function(err, course) {
      console.log("course: " + course);
      if (err) console.log(err);
      models.Assignment
      .where('slug').in(course.assignments)
      .exec(function (err, assns) {
        res.render('browse/course', {
          course:   { name: course.name, slug: course.slug },
          assns: _(assns).map(function (assn) {
            return { name: assn.name, slug: assn.slug };
          })
        });
      });
    });
  });
}