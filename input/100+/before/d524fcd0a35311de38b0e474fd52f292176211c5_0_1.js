function collapseZeroes() {
    t = value.join('');
    value = [];
    if (t === '0 0' || t === '0 0 0 0' || t === '0 0 0') {
      if (property === 'background-position' || property === '-webkit-transform-origin' || property === '-moz-transform-origin') {
        buffer('0 0');
      } else {
        buffer('0');
      }
    } else if (t === 'none' && (NONE_PROPERTIES.indexOf(property) !== -1 || property === 'background')) {
      buffer('0');
    } else {
      buffer(t);
    }
  }