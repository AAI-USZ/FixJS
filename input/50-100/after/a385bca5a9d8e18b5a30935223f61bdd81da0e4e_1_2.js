function set_user(req, callback) {
  /*if(req.session.auth) {
    userdata.get_user(function(err, docs) {
      if(err && err.length > 0) {
        console.log("found error");
        console.log(err);
        return [{
          nick: "",
          admin: false
        }]
      } else {
        console.log("returning user doc");
        console.log(JSON.stringify(doc));
        return doc;
      }
    });
  } */
  if(req.loggedIn) {
    users.find({userid: req.session.auth.twitter.user.id_str}, function(err, docs) {
      console.log("found user");
      console.log(docs);
      callback(err, docs);
    });
  } else {
   callback("",  [{
    nick: "",
    admin: false
   }]);
  }

}