function (err, course) {
      models.Assignment
      .findOne({ slug: assnid })
      .populate('files')
      .exec(function (err, assn) {
        var file = _.find(assn.files, function (file) {
          return (file.slug === fileid);
        });
        fs.readFile(file.path, function (err, contents) {
          var idx = 1;
          var annotated = _(contents.toString().split("\n")).map(function (line) {
            var buf = "";
            var leader = "<dt>" + idx + "</dt>";
            while (line.length >= 80) {
              buf += format(line.slice(0, 80)) + "<br/>";
              line = line.slice(80, line.length);
            }
            buf += format(line);
            idx++;
            return leader + "<dd class=\"code\">" + buf + "</dd>";
          }).join("\n");
          res.render('review', {
            course: { name: course.name, slug: course.slug },
            assn:   { name: assn.name, slug: assn.slug },
            file:   {
              name:     file.name,
              slug:     file.slug,
              contents: annotated
            }
          });
        });
      });
    }