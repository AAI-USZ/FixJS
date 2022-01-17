function scan() {

      if (scanning)
        return;

      // stop auto-scanning if wifi disabled or the app is hidden
      if (!wifiManager.enabled || document.mozHidden) {
        scanning = false;
        return;
      }

      var req = wifiManager.getNetworks();
      scanning = true;
      // clear list before starting scan
      clear();
      // add a "Searching..." box
      list.appendChild(newScanItem());

      req.onsuccess = function() {
        scanning = false;
        // clear list again for showing scaning result.
        clear();
        var networks = req.result;

        // sort networks: connected network first, then by signal strength
        var ssids = Object.getOwnPropertyNames(networks);
        ssids.sort(function(a, b) {
          return isConnected(networks[b]) ? 100 :
              networks[b].relSignalStrength - networks[a].relSignalStrength;
        });

        for (var i = 0; i < ssids.length; i++) {
          var network = networks[ssids[i]];
          var listItem = newListItem(network);
          if (network.connected)
            listItem.querySelector('small').textContent =
                _('shortStatus-connected');
          list.appendChild(listItem);
          index[network.ssid] = listItem; // add to index
        }

        // append 'scan again' button
        var button = document.createElement('button');
        button.textContent = _('scanNetworks');
        button.onclick = function() {
          scan();
        };
        var li = document.createElement('li');
        li.appendChild(button);
        list.appendChild(li);

        // auto-rescan if requested
        if (autoscan)
          window.setTimeout(scan, scanRate);
      };

      req.onerror = function(error) {
        scanning = false;
        console.warn('====== wifi error: ' + req.error.name);
        clear();

        // auto-rescan if requested
        if (autoscan)
          window.setTimeout(scan, scanRate);
      };

    }