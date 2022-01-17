function enableSaveBtns(enable) {
      docSaveBtn[enable ? 'removeClass' : 'addClass']('disabled');
      docSaveAsBtn[enable ? 'removeClass' : 'addClass']('disabled');
    }