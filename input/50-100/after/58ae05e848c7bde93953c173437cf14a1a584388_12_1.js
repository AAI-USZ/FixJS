function (err3, p_obj) {
  
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
          }