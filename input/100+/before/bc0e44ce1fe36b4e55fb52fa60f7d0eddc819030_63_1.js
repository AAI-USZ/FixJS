function() {
        scanning = false;
        var networks = req.result;

        // sort networks: connected network first, then by signal strength
        var ssids = Object.getOwnPropertyNames(networks);
        ssids.sort(function(a, b) {
          return isConnected(networks[b]) ? 100 :
              networks[b].relSignalStrength - networks[a].relSignalStrength;
        });

        // create list
        clear();
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
          clear(true);
          scan();
        };
        var li = document.createElement('li');
        li.appendChild(button);
        list.appendChild(li);

        // auto-rescan if requested
        if (autoscan)
          window.setTimeout(scan, scanRate);
      }