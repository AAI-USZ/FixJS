function getCarrierSettings(evt) {
  var gNetwork;

  // initialize data settings
  gMobileConnection.addEventListener('datachange', updateConnection);
  updateConnection();

  // query <apn> elements matching the mcc/mnc arguments
  function queryAPN(apnDocument, mcc, mnc) {
    var query = '//gsm[network-id[@mcc=' + mcc + '][@mnc=' + mnc + ']]/apn';
    var xpe = new XPathEvaluator();
    var nsResolver = xpe.createNSResolver(apnDocument);
    var result = xpe.evaluate(query, apnDocument, nsResolver, 0, null);

    var found = [];
    var res = result.iterateNext();
    while (res) { // turn each resulting XML element into a JS object
      var apn = {
        id: res.getAttribute('value'),
        name: '',
        plan: '',
        usage: '',
        username: '',
        password: '',
        dns: []
      };
      var node = res.firstElementChild;
      while (node) {
        if (node.tagName == 'dns') {
          apn.dns.push(node.textContent);
        } else {
          apn[node.tagName] = node.textContent || node.getAttribute('type');
        }
        node = node.nextElementSibling;
      }
      found.push(apn);
      res = result.iterateNext();
    }

    return found;
  }

  // create a button to apply <apn> data to the current fields
  function createAPNButton(item) {
    function setFieldValue(name, value) {
      var selector = 'input[data-setting="ril.data.' + name + '"]';
      document.querySelector(selector).value = value || '';
    }

    var button = document.createElement('input');
    button.type = 'button';
    button.value = item.name || item.id;
    button.onclick = function fillAPNData() {
      setFieldValue('apn', item.id);
      setFieldValue('user', item.username);
      setFieldValue('passwd', item.password);
    };

    return button;
  }

  // update APN fields
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
  };

  // update `gNetwork' when the data connection has changed
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
}