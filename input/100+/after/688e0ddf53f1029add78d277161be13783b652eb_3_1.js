function(e) {
    console.log('mozChromeEvent.received: ' + e.detail.type);
    switch (e.detail.type) {
      // Chrome asks Gaia to create a trusted iframe. Once it is created,
      // Gaia sends the iframe back to chrome so frame scripts can be loaded
      // as part of the iframe content.
      case 'open-trusted-dialog':
        if (!e.detail.trustedFrame)
          return;
        var frame = TrustedDialog.open(e.detail.trustedFrame);
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('mozContentEvent', true, true,
                              {id: e.detail.id, frame: frame});
        window.dispatchEvent(event);
        break;

      // Chrome is asking Gaia to close the current trusted dialog. Once it is
      // closed, Gaia notifies back to the chrome.
      case 'close-trusted-dialog':
        TrustedDialog.close(function closeTrustedDialog() {
          var event = document.createEvent('customEvent');
          event.initCustomEvent('mozContentEvent', true, true,
                                {id: e.detail.id});
          window.dispatchEvent(event);
        });
        break;
    }
  }