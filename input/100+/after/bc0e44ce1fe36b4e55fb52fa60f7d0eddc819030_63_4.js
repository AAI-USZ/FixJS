function toggleNetwork(network) {
    if (isConnected(network)) {
      // online: show status + offer to disconnect
      wifiDialog('#wifi-status', wifiDisconnect);
    } else if (network.password && (network.password == '*')) {
      // offline, known network (hence the '*' password value):
      // no further authentication required.
      setPassword();
      wifiConnect();
    } else {
      // offline, unknonw network: offer to connect
      var key = getKeyManagement();
      switch (key) {
        case 'WEP':
        case 'WPA-PSK':
        case 'WPA-EAP':
          wifiDialog('#wifi-auth', wifiConnect, key);
          break;
        default:
          wifiConnect();
      }
    }

    function wifiConnect() {
      gWifiManager.associate(network);
      gNetworkList.display(network.ssid, _('shortStatus-connecting'));
    }

    function wifiDisconnect() {
      gWifiManager.forget(network);
      gNetworkList.display(network.ssid, _('shortStatus-disconnected'));
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

    function setPassword(password, identity) {
      var key = getKeyManagement();
      if (key == 'WEP') {
        network.wep = password;
      } else if (key == 'WPA-PSK') {
        network.psk = password;
      } else if (key == 'WPA-EAP') {
        network.password = password;
        if (identity) {
          network.identity = identity;
        }
      }
      network.keyManagement = key;
    }

    // generic wifi property dialog
    // TODO: the 'OK' button should be disabled until the password string
    //       has a suitable length (e.g. 8..63)
    function wifiDialog(selector, callback, key) {
      var dialog = document.querySelector(selector);
      if (!dialog || !network)
        return null;

      // network info
      var keys = network.capabilities;
      var sl = Math.min(Math.floor(network.relSignalStrength / 20), 4);
      dialog.querySelector('[data-ssid]').textContent = network.ssid;
      dialog.querySelector('[data-speed]').textContent = network.linkSpeed;
      dialog.querySelector('[data-signal]').textContent = _('signalLevel' + sl);
      dialog.querySelector('[data-security]').textContent =
          (keys && keys.length) ? keys.join(', ') : _('securityNone');

      // authentication fields
      if (key) {
        var identity = dialog.querySelector('input[name=identity]');
        identity.value = network.identity || '';

        var password = dialog.querySelector('input[name=password]');
        password.type = 'password';
        password.value = network.password || '';

        var showPassword = dialog.querySelector('input[name=show-pwd]');
        showPassword.checked = false;
        showPassword.onchange = function() {
          password.type = this.checked ? 'text' : 'password';
        };

        // XXX hack: hide the footer (which contains the 'OK' button...)
        //           when the virtual keyboard is shown
        var footer = dialog.querySelector('footer');
        var inputs = dialog.querySelectorAll('[type=text], [type=password]');
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].onfocus = function hideFooter() {
            footer.style.display = 'none';
          };
          inputs[i].onblur = function showFooter() {
            footer.style.display = 'block';
          };
        }
      }

      // hide dialog box
      function close() {
        // reset authentication fields
        if (key) {
          identity.value = '';
          password.value = '';
          showPassword.checked = false;
        }
        // 'close' (hide) the dialog
        dialog.removeAttribute('class');
        return false; // ignore <form> action
      }

      // OK|Cancel buttons
      dialog.onreset = close;
      dialog.onsubmit = function() {
        if (key) {
          setPassword(password.value, identity.value);
        }
        if (callback) {
          callback();
        }
        return close();
      };

      // show dialog box
      dialog.className = 'active ' + key;
      return dialog;
    }
  }