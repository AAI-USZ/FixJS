function (k) {
    if (defaults[k] && typeof defaults[k] === 'object') return
    var val = JSON.stringify(defaults[k])
    if (defaults[k] !== ini.get(k)) {
      if (!long) return
      msg += "; " + k + " = " + val
          + " (overridden)" + eol
    } else msg += k + " = " + val + eol
  }