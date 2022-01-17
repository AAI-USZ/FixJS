function (k) {
      if (k === "argv") return
      msg += k + " = " + JSON.stringify(cli[k]) + eol
    }