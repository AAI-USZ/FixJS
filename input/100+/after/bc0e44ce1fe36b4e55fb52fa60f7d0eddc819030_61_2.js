function autoAPN() {
    var APN_FILE = 'serviceproviders.xml';
    if (!gNetwork) // XXX should never happen
      return;

    var apnList = document.getElementById('autoAPN-list');
    apnList.innerHTML = '';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', APN_FILE, false); // synchronous (boo!)
    xhr.send();

    var results = queryAPN(xhr.responseXML, gNetwork.mcc, gNetwork.mnc);
    for (var i = 0; i < results.length; i++) {
      var button = createAPNButton(results[i]);
      apnList.appendChild(button);
      if (i == 0) // always apply the data in the first <apn> element
        button.click();
    }
  }