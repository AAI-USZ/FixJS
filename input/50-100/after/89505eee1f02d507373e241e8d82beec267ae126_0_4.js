function (k) {
      if (gconf[k] && typeof gconf[k] === 'object') return
      var val = (k.charAt(0) === "_")
              ? "---sekretz---"
              : JSON.stringify(gconf[k])
      if (gconf[k] !== ini.get(k)) {
        if (!long) return
        msg += "; " + k + " = " + val
            + " (overridden)" + eol
      } else msg += k + " = " + val + eol
    }