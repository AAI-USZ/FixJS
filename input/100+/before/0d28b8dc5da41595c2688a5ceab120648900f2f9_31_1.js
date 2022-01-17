function() {
        scanning = false;

        // clear list again for showing scaning result.
        clear(false);
        var button = document.createElement('button');
        button.textContent = _('scanNetworks');
        button.onclick = function() {
          clear(true);
          scan();
        };
        var scanItem = document.createElement('li');
        scanItem.appendChild(button);
        list.appendChild(scanItem);

        // sort networks: connected network first, then by signal strength
        var networks = req.result;
        var ssids = Object.getOwnPropertyNames(networks);
        ssids.sort(function(a, b) {
          return networks[b].relSignalStrength - networks[a].relSignalStrength;
        });

        console.log("==== scan callback: get " + ssids.length + " networks");
        for (var i = 0; i < ssids.length; i++) {
          var network = networks[ssids[i]];
          var listItem = newListItem(network);
          // put connected network on top of list
          if (isConnected(network)) {
            listItem.className = 'active';
            listItem.querySelector('small').textContent = _('shortStatus-connected');
            list.insertBefore(listItem, list.firstChild);
          } else {
            list.insertBefore(listItem, scanItem);
          }
          index[network.ssid] = listItem; // add to index
        }

        // auto-rescan if requested
        if (autoscan)
          window.setTimeout(scan, scanRate);
      }