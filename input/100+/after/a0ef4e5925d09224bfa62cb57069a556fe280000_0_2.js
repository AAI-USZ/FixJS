function makePopupHtml(host) {
  var txt;
  txt = '<table class="map-marker"><tbody>'
  if (host.na) {
    txt += '<tr><td>' + Drupal.t("Approx member location") + '</td></tr><tr><td>(' + Drupal.t('Not currently available') + ')</td></tr>';
  }
  else if (loggedin) {
    txt += '<tr><td><b><a href="/user/' + host.uid + '">' + host.name + '</a>' + '</b><br/> ' + host.city + ", " + host.prov + ", " + host.country + '</td></tr><tr><td><a href="/user/' + host.uid + '/contact" target="_blank">' + Drupal.t('Click to email') + '</a><td></tr>';
  } else {
    txt = '<tr><td>' + host.city + ", " + host.prov + ", " + host.country + '</td></tr><tr><td>' + Drupal.t('<a href="/user/login">Log in</a> or <a href="/user/register">register</a> to get more info') + '.</td></tr>';
  }
  txt += '</tbody></table>';
  return txt;
}