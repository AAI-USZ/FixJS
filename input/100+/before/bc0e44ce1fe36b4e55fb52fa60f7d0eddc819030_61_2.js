function autoAPN() {
    var APN_FILE = 'serviceproviders.xml';
    if (!gNetwork) // XXX should never happen
      return;

    // get MCC/MNC values
    var mcc = gNetwork.mcc;
    var mnc = gNetwork.mnc;

    var apnList = document.getElementById('autoAPN-list');
    apnList.innerHTML = '';
    if (DEBUG) { // display MCC/MNC in the UI
      apnList.innerHTML += 'mcc: ' + mcc + ' / mnc: ' + mnc + '<br />';
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', APN_FILE, false); // synchronous (boo!)
    xhr.send();

    var results = queryAPN(xhr.responseXML, mcc, mnc);
    for (var i = 0; i < results.length; i++) {
      var button = createAPNButton(results[i]);
      apnList.appendChild(button);
      if (i == 0) // always apply the data in the first <apn> element
        button.click();
    }
  }