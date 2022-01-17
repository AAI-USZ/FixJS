function updateConnection(fakeNetwork) {
    var conn = window.navigator.mozMobileConnection;
    if (conn && conn.data && conn.data.network) {
      gNetwork = conn.data.network;
    } else { // in DEBUG mode, a fake network can be provided
      gNetwork = fakeNetwork;
    }

    // display data carrier name
    var shortName = gNetwork ? gNetwork.shortName : '';
    document.getElementById('data-desc').textContent = shortName;
    document.getElementById('dataNetwork-desc').textContent = shortName;

    // enable the 'autoAPN' button
    var item = document.getElementById('autoAPN');
    item.querySelector('input').onclick = autoAPN;
    item.style.display = gNetwork ? 'block' : 'none';
  }