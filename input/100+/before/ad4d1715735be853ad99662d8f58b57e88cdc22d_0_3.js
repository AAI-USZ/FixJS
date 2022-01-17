function(err, data) {
      var userid, username;
      if (req.isAuthenticated()) {
        username = req.getAuthDetails().username;
        userid = req.getAuthDetails().user_id;
      } else {
        username = "";
        userid = "0";
      }
      theCase.mdhelp = JSON.parse(data);
      return db.hgetall("case:" + req.params.id, function(err, casedata) {
        if (!(err || !casedata)) {
          theCase.modalities = casedata.modalities;
          theCase.description = casedata.description;
        }
        if (casedata.hidden === 'true' && !editor && username !== 'radioca1se') {
          res.redirect('/');
        }
        return db.sismember("bookmarks:" + userid, req.params.id, function(err, bookmarked) {
          if (!err) theCase.bookmarked = bookmarked;
          return db.sismember("completed:" + userid, req.params.id, function(err, completed) {
            if (!err) theCase.completed = completed;
            return db.lrange("case:" + req.params.id + ":page:" + req.params.page + ":radios", 0, -1, function(err, radioIDs) {
              if (radioIDs.length < 1) return render(req, res, theCase, editor);
              theCase.radios = [];
              return radioIDs.forEach(function(radioID, ID) {
                return db.get("case:" + req.params.id + ":page:" + req.params.page + ":radio:" + radioID + ":caption", function(err, caption) {
                  theCase.radios[ID] = [];
                  theCase.radios[ID].ID = radioID;
                  if (caption) theCase.radios[ID].caption = caption;
                  return db.lrange("radio:" + radioID, 0, -1, function(err, images) {
                    theCase.radios[ID].images = [];
                    images.forEach(function(image, imgID) {
                      return theCase.radios[ID].images[imgID] = image;
                    });
                    theCase.feedback = [];
                    return db.lrange("case:" + req.params.id + ":page:" + req.params.page + ":feedback", 0, -1, function(err, feedback) {
                      feedback.forEach(function(fb, fbID) {
                        return theCase.feedback[fbID] = fb;
                      });
                      if (!radioIDs[ID + 1]) {
                        return render(req, res, theCase, editor);
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    }