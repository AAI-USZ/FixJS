function enableUpload(enable) {
      if (enable) {
        if ($('.download-panel').is(':hidden')) {
          clearFileList();
          $('.download-panel').show();
        }
      }
    }