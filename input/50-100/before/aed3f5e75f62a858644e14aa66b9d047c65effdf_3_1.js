function save(user, cookie) {
  var o;
  var keyId = keys.KEY_ID;
  if(arguments.length == 1){
    o = {};
    o[keyId] = user;
  } else if(arguments.length == 2){
    o = {user: user, cookie: cookie};
  }
  saveTarget(o);
}