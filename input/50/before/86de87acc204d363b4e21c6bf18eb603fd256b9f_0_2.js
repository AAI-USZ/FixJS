function onScanError(error) {
        scanning = false;
        console.warn('wifi error: ' + req.error.name);
        gStatus.textContent = req.error.name;

        // auto-rescan if requested
        if (autoscan)
          window.setTimeout(scan, scanRate);
      }