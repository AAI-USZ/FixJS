function (err, p_obj) {

      if (err) {
        return callback(err, null);
      }

      var
        postId = p_obj.getId();
      
      //save video info for given postId
      videoObj.saveForPost(postId, function(err2, v_obj) {

        if (err2) {
          return callback(err2, null);
        }

        var
          tagsLen = tags.length,
          Post_Tag = require(process.env.APP_PATH + "/models/post/tag").Post_Tag,
          Post_Rate = require(process.env.APP_PATH + "/models/post/rate").Post_Rate,
          Post_Views = require(process.env.APP_PATH + "/models/post/views").Post_Views,
          postViews = new Post_Views(postId),
          postRate = new Post_Rate(postId);
  
        //async: add user to already rated this post (has posted it)
        postRate.rate(1, p_obj.getUserId(), function (err2, res2) {
          if (err2) {
            log.critical(err2);
          }
        });
  
        //async: update tags
        for (var i = 0; i < tagsLen; ++i) {
  
          var
            postTag = new Post_Tag(tags[i]);
  
          postTag.addToPost(postId, function (err3, res3) {
            if (err3) {
              log.critical(err3);
            }
          });
        }
  
        //async: create views counter
        postViews.createCounter(function (err4, res4) {
          if (err4) {
            log.critical(err4);
          }
        });
  
        //async: add post to new set
        p_obj.addPostToNew(function (err5, res5) {
          if (err5) {
            log.critical(err5);
          }
        });
  
        //return, created object, don't wait for async methods
        return callback(null, p_obj);
      });        
    }