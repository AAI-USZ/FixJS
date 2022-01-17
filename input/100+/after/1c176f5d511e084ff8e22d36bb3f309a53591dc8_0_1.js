function initOptionPage() {
  var text = Settings.get('vromerc');
  var elem = document.getElementById('vromerc');
  elem.value = text;

  var onlineUrl = Settings.get('onlineVromercUrl');
  document.getElementById('onlineVromercUrl').value = onlineUrl;

  var reloadInterval = Settings.get("onlineVromercReloadInterval");
  document.getElementById('onlineVromercReloadInterval').value = reloadInterval;

  var lastUpdatedAt = Settings.get("onlineVromercLastUpdatedAt");
  document.getElementById('onlineVromercLastUpdatedAt').innerHTML = lastUpdatedAt;

  changeAccessButtonStatus(oauth.hasToken());
  switchTab(document.location.hash.replace(/^#/, "") || 'setting');

  // add listeners
  var links = document.getElementsByTagName('a')
  _.each(links, function(v) {
    if (v && v.parentNode && v.parentNode.parentNode) {
      v.addEventListener('click', function(e) {
        switchTab(v.hash.substring(1));
        e.stopPropagation();
        return false
      })
    }
  })
}