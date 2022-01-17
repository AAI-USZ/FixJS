function ime_show(inputType) {
      debug('Show. Input type: ' + inputType);
      var layout = IMELayouts.JP;
      if (inputType === '' || inputType === 'text' ||
          inputType === 'textarea') {
        layout = _currLayout;
      }

      _glue.alterKeyboard(layout);
    }