function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(/(\b[a-z])/g, '_BeJS_CAP_$1').split(/_BeJS_CAP_/).map(function(w) {
      return (w[0] || '').toUpperCase() + w.substring(1);
    }).join('');
  }