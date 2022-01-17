function (code) {
    var er = null
    if (code) er = new Error("`"+cmd
                            +(args.length ? " "
                                          + args.map(JSON.stringify).join(" ")
                                          : "")
                            +"` failed with "+code)
    cb(er, code, stdout, stderr)
  }