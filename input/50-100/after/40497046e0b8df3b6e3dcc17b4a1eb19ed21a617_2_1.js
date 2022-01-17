function (err, assns) {
        if (err) return next(new Error("Internal Server Error"));
        if (assns === null) return next(errors.NotFound);
        res.render('browse/course', {
          course:   { name: course.name, slug: course.slug },
          assns: _(assns).map(function (assn) {
            return { name: assn.name, slug: assn.slug };
          })
        });
      }