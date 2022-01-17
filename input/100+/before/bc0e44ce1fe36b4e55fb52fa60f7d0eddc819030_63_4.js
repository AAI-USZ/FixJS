function toggleNetwork(network) {
    if (isConnected(network)) {
      // online: show status + offer to disconnect
      wifiDialog('#wifi-status', wifiDisconnect);
    } else if (network.password == '*') {
      // offline, known network (hence the '*' password value):
      // no further authentication required.
      setPassword();
      wifiConnect();
    } else {
      // offline, unknonw network: offer to connect
      var key = getKeyManagement();
      if (key == 'WEP') {
        wifiDialog('#wifi-wep', wifiConnect);
      } else if (key == 'WPA-PSK') {
        wifiDialog('#wifi-psk', wifiConnect);
      } else if (key == 'WPA-EAP') {
        wifiDialog('#wifi-eap', wifiConnect);
      } else {
        wifiConnect();
      }
    }

    function wifiConnect() {
      wifiManager.associate(network);
      gStatus.textContent = '';
      gNetworkList.display(network.ssid, _('shortStatus-disconnected'));
    }

    function wifiDisconnect() {
      wifiManager.forget(network);
      gNetworkList.display(network.ssid, _('shortStatus-disconnected'));
      gStatus.textContent = '';
    }

    function getKeyManagement() {
      var key = network.capabilities[0];
      if (/WEP$/.test(key))
        return 'WEP';
      if (/PSK$/.test(key))
        return 'WPA-PSK';
      if (/EAP$/.test(key))
        return 'WPA-EAP';
      return '';
    }

    function setPassword(password) {
      var key = getKeyManagement();
      if (key == 'WEP') {
        network.wep = password;
      } else if (key == 'WPA-PSK') {
        network.psk = password;
      } else if (key == 'WPA-EAP') {
        network.password = password;
      }
      network.keyManagement = key;
    }

    // generic wifi property dialog
    // TODO: the 'OK' button should be disabled until the password string
    //       has a suitable length (e.g. 8..63)
    function wifiDialog(selector, callback) {
      var dialog = document.querySelector(selector);
      if (!dialog || !network)
        return null;

      // network info
      var ssid = dialog.querySelector('*[data-ssid]');
      if (ssid)
        ssid.textContent = network.ssid;

      var keys = network.capabilities;
      var security = dialog.querySelector('*[data-security]');
      if (security)
        security.textContent = (keys && keys.length) ?
            keys.join(', ') : _('securityNone');

      var signal = dialog.querySelector('*[data-signal]');
      if (signal) {
        var lvl = Math.min(Math.floor(network.relSignalStrength / 20), 4);
        signal.textContent = _('signalLevel' + lvl);
      }

      var speed = dialog.querySelector('*[data-speed]');
      if (speed) {
        speed.textContent = network.linkSpeed;
      }

      // identity/password
      var identity = dialog.querySelector('input[name=identity]');
      if (identity)
        identity.value = network.identity || '';

      var password = dialog.querySelector('input[name=password]');
      if (password) {
        password.type = 'password';
        password.value = network.password || '';
      }

      var showPassword = dialog.querySelector('input[name=show-pwd]');
      if (showPassword) {
        showPassword.checked = false;
        showPassword.onchange = function() {
          password.type = this.checked ? 'text' : 'password';
        };
      }

      // hide dialog box
      function close() {
        // reset identity/password fields
        if (identity)
          identity.value = '';
        if (password)
          password.value = '';
        if (showPassword)
          showPassword.checked = false;
        // 'close' (hide) the dialog
        document.body.classList.remove('dialog');
        dialog.classList.remove('active');
      }

      // OK|Cancel buttons
      var buttons = dialog.querySelectorAll('footer button');

      var okButton = buttons[0];
      okButton.onclick = function() {
        if (identity)
          network.identity = identity.value;
        if (password)
          setPassword(password.value);
        close();
        return callback ? callback() : false;
      };

      var cancelButton = buttons[1];
      cancelButton.onclick = function() {
        close();
        return;
      };

      // show dialog box
      dialog.classList.add('active');
      document.body.classList.add('dialog');
      return dialog;
    }
  }