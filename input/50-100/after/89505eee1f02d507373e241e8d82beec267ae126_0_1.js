function (k) {
      if (cli[k] && typeof cli[k] === 'object') return
      if (k === "argv") return
      if (typeof cli[k] === 'object') return
      msg += k + " = " + JSON.stringify(cli[k]) + eol
    }