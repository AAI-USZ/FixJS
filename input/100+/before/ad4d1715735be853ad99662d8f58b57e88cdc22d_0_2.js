function(err, cases) {
      var sendcases;
      if (!(err || !cases[0])) {
        console.log(cases[0]);
        sendcases = [];
        return db.smembers("bookmarks:" + userid, function(err, bookmarks) {
          return db.smembers("completed:" + userid, function(err, completed) {
            return cases.forEach(function(theCase, iteration) {
              return db.get("case:" + theCase + ":firstpage", function(err, firstpage) {
                return db.hgetall("case:" + theCase, function(err, sendcase) {
                  sendcase.firstpage = firstpage;
                  sendcases[iteration] = sendcase;
                  if (!cases[iteration + 1]) {
                    console.log("rendering cases");
                    return res.render("cases", {
                      title: "Cases",
                      signed_in: req.isAuthenticated(),
                      user: (req.isAuthenticated() ? req.getAuthDetails().user.username : "0"),
                      cases: sendcases,
                      bookmarks: bookmarks,
                      completed: completed
                    });
                  }
                });
              });
            });
          });
        });
      }
    }