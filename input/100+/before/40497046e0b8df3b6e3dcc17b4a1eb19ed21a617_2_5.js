function(req, res) {
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
  }