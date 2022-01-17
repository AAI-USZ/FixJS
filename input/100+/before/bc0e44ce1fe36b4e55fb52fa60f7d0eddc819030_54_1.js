function(e) {
      var exclusionList = [
        'button', 'checkbox', 'file',
        'image', 'reset', 'submit'
      ];
      if (e.detail.type === 'blur') {
        IMEController.hideIME();
      } else {
        if (exclusionList.indexOf(e.detail.type) === -1)
          IMEController.showIME(e.detail.type);
      }
    }