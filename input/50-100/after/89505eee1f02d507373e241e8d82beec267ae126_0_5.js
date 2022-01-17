function (k) {
      if (bconf[k] && typeof bconf[k] === 'object') return
      var val = (k.charAt(0) === "_")
              ? "---sekretz---"
              : JSON.stringify(bconf[k])
      if (bconf[k] !== ini.get(k)) {
        if (!long) return
        msg += "; " + k + " = " + val
            + " (overridden)" + eol
      } else msg += k + " = " + val + eol
    }