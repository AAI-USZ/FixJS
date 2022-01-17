function (k) {
      if (env[k] !== ini.get(k)) {
        if (!long) return
        msg += "; " + k + " = " + JSON.stringify(env[k])
            + " (overridden)" + eol
      } else msg += k + " = " + JSON.stringify(env[k]) + eol
    }