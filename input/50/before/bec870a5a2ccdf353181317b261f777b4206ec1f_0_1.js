function ime_show(inputType) {
      debug('Show. Input type: ' + inputType);
      var layout = 'jp-kanji';
      if (inputType === '' || inputType === 'text' ||
          inputType === 'textarea') {
        layout = _currLayout;
      }

      _glue.alterKeyboard(layout);
    }