function makePopupHtml(host) {
  var txt;
  var style = "";
  if (loggedin) {
    txt = '<table style="' + style + '" ><tbody><tr><td><b><a href="/user/' + host.uid + '">' + host.name + '</a>' + '</b><br/> ' + host.city + ", " + host.prov + ", " + host.country + '</td></tr><tr><td><a href="/user/' + host.uid + '/contact" target="_blank">' + Drupal.t('Click to email') + '</a><td></tr></tbody></table>';
  } else {
    txt = '<table style="' + style + '" ><tbody><tr><td>' + host.city + ", " + host.prov + ", " + host.country + '</td></tr><tr><td>' + Drupal.t('<a href="/user/login">Log in</a> or <a href="/user/register">register</a> to get more info') + '.</td></tr></tbody></table>';
  }
  return txt;


}