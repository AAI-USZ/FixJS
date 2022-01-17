function(event) {
    // update network status only if wifi is enabled.
    console.log("===== network becomes: " + event.status);
    var req = settings.getLock().get('wifi.enabled');
    req.onsuccess = function wf_stateGet() {
      if (req.result['wifi.enabled']) {
        updateNetworkState();

        // refresh the network list when network is connected.
        if (event.status == 'connected') {
          gNetworkList.scan();
        }
      }
    }
  }