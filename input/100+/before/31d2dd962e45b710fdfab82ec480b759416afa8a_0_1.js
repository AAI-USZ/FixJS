function _getSwitchKey(layoutMode) {
    var value, keyCode;

    // next is SYMBOLS
    if (layoutMode === LAYOUT_MODE_DEFAULT) {
      value = '?123';
      keyCode = ALTERNATE_LAYOUT;

    // next is ABC
    } else {
      value = 'ABC';
      keyCode = BASIC_LAYOUT;
    }

    return {
      value: value,
      ratio: 2,
      keyCode: keyCode
    };
  }