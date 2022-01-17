function processLogin(user, pwd, err, json, cb){
  if (err) return cb(err);
  var js = JSON.parse(json);
  if (js.result != 'ok') {
    login.message = "Login failed: " + js.reason;
    return cb("login failed: " + js.reason, js);
  } else { 
    ini.set("username", user, "user");
    ini.set("_password", pwd, "user");
    ini.set("cookie", js.login, "user");
    log("Authorized user " + user, "login");

    targets.save(user, js.login);
    ini.save(function(err){
      login.message = "Successfully logged into " + fhreq.getFeedHenryUrl();
      return cb(err, js);
    });
  }  
}