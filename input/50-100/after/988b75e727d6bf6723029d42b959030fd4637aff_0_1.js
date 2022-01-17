function (req, res, next) {
  var user = req.session.oauthUser;
  res.writeHeader(200, { 'Content-Type': 'text/html' });
  if (!user) {
    res.end('Login with <a href="/login?type=weibo">Weibo</a> | \
      <a href="/login?type=tqq">QQ</a> | \
      <a href="/login?type=github">Github</a>');
    return;
  }
  res.end('Hello, <img src="' + user.profile_image_url + '" />\
    <a href="' + user.t_url + 
    '" target="_blank">@' + user.screen_name + '</a>. ' + 
    '<a href="/logout">Logout</a>');
}