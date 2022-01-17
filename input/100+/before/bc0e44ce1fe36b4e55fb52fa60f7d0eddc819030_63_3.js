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