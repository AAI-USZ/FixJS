function visibility(e) {
  var url = document.location.href;
  var data = e.data;
  var params = (function makeURL() {
    var a = document.createElement('a');
    a.href = url;

    var rv = {};
    var params = a.search.substring(1, a.search.length).split('&');
    for (var i = 0; i < params.length; i++) {
      var data = params[i].split('=');
      rv[data[0]] = data[1];
    }
    return rv;
  })();

  if (!document.mozHidden) {
    Recents.render();
    Recents.startUpdatingDates();

    var choice = params['choice'];
    if (choice == 'contact') {
      Contacts.load();
    }
  } else {
    Recents.stopUpdatingDates();
  }
}