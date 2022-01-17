function save(user, cookie, domain) {
  var o;
  var keyId = keys.KEY_ID;
  if(arguments.length == 1){
    o = {};
    o[keyId] = user;
  } else if(arguments.length == 2 || arguments.length == 3){
    o = {user: user, cookie: cookie, domain: domain};
  }
  saveTarget(o, user);
}