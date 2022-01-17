function (err, decoratedPosts) {

            if (err) {
              return next(err);
            }

            var
              data = decoratedPosts[0];

            res.json(data, 201);
            RequestLogger.log(req, data);
          }