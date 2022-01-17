function updateConnection() {
    gNetwork = gMobileConnection.data ? gMobileConnection.data.network : null;

    // display data carrier name
    var shortName = gNetwork ? gNetwork.shortName : '';
    document.getElementById('data-desc').textContent = shortName;
    document.getElementById('dataNetwork-desc').textContent = shortName;

    // enable the 'autoAPN' button
    var item = document.getElementById('autoAPN');
    item.querySelector('input').onclick = autoAPN;
    item.style.display = gNetwork ? 'block' : 'none';
  }