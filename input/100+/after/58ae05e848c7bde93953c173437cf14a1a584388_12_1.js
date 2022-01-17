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
        Video = require(process.env.APP_PATH + "/models/video").Video;

      if (!url) {
        return next(error(400, 'Bad Request (url)'));
      }

      Video.factory(url, function (err2, videoObj) {
  
        if (err2) {
          return next(err2);
        }
        
        if (!videoObj.getUrl()) {
          return next(error(400, 'Bad request (url param)'));
        }
  
        var
          categoryId = ~~(input.categoryId) || 0,
          tags = input.tags || [],
          Post = require(process.env.APP_PATH + "/models/post").Post,
          post = new Post();
  
        try {
          post.createNewPost(videoObj, categoryId, tags, userId, function (err3, p_obj) {
  
            if (err3) {
              return next(err3);
            }
  
            
            //TODO dont use decorator 
            var
              decorator_PostLink = require(process.env.APP_PATH + "/models/decorator/postLink").decorator_PostLink;
  
            decorator_PostLink([p_obj], function (err4, decoratedPosts) {
  
              if (err4) {
                return next(err4);
              }
  
              var
                data = decoratedPosts[0];
  
              res.json(data, 201);
              RequestLogger.log(req, data);
            });
          });
        }
        catch (e) {
          return next(e);
        }
      });
    }