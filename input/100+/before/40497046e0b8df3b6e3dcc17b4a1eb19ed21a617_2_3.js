function(req, res) {
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
  }