function onScanError(error) {
        scanning = false;
        console.warn('====== wifi error: ' + req.error.name);
        clear(false);

        // auto-rescan if requested
        if (autoscan)
          window.setTimeout(scan, scanRate);
      }