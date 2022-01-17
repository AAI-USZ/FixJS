function (err, contents) {
          if (err) return next(new Error("Internal Server Error"));
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
              id:       file._id,
              name:     file.name,
              slug:     file.slug,
              contents: annotated
            }
          });
        }