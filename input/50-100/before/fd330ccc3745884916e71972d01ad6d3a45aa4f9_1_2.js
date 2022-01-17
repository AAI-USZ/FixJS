function(e) {
      if (e.detail.type === 'blur') {
        IMEController.hideIME();
      } else {
        if (e.detail.type != 'submit')
          IMEController.showIME(e.detail.type);
      }
    }