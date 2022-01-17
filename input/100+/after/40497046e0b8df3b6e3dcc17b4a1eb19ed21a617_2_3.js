function(req, res, next) {
    var courseid = req.params.courseid,
      assnid = req.params.assnid;
    models.Course.findOne({ slug: courseid }, function (err, course) {
      if (err) return next(new Error("Internal Server Error"));
      if (course === null) return next(errors.NotFound);
      models.Assignment
      .findOne({ slug: assnid })
      .populate('files')
      .exec(function (err, assn) {
      if (err) return next(new Error("Internal Server Error"));
      if (assn === null) return next(errors.NotFound);
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