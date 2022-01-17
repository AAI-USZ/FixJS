function onScanError(error) {
        scanning = false;
        clear(false);

        // auto-rescan if requested
        if (autoscan)
          window.setTimeout(scan, scanRate);
      }