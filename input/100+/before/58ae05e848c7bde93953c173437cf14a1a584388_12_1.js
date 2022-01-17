function (err, obj) {

      //if something wrong
      if (err) {
        return next(err);
      }

      var
        userId = obj.getUserId();

      if (userId < 1) {
        return next(error(401, 'Session not authorized (userId)'));
      }

      if (!req.body) {
        return next(error(400, 'Bad request (no POST data)'));
      }

      var
        postData = (req.body) ? req.body.data : '{}',
        input = JSON.parse(postData),
        url = input.url || '',
        Url = require(process.env.APP_PATH + "/models/url").Url,
        urlObj = new Url(url);

      if (!urlObj.isValid()) {
        return next(error(400, 'Bad request (url param)'));
      }

      var
        categoryId = ~~(input.categoryId) || 0,
        tags = input.tags || [],
        Post = require(process.env.APP_PATH + "/models/post").Post,
        post = new Post();

      try {
        post.createNewPost(urlObj, categoryId, tags, userId, function (err2, p_obj) {

          if (err2) {
            return next(err2);
          }

          var
            decorator_PostLink = require(process.env.APP_PATH + "/models/decorator/postLink").decorator_PostLink;

          decorator_PostLink([p_obj], function (err, decoratedPosts) {

            if (err) {
              return next(err);
            }

            var
              data = decoratedPosts[0];

            res.json(data, 201);
            RequestLogger.log(req, data);
          });
        });
      }
      catch (err3) {
        return next(err3);
      }
    }