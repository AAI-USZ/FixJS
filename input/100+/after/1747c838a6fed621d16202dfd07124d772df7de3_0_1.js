function insert_user_into_list(user, target){
  var privs = [];
  for (var name in user.privileges) {
    privs.push(name);
  }
  $.tmpl("userItemTemplate", [{
    UserName:user.username,
    Limited:(user.limited ? ' (limited)' : ''),
    Privileges:privs.sort().map(function(p){return {name: p, status: user.privileges[p], text: p + ':' + user.privileges[p]};})
  }]).appendTo(target);
}