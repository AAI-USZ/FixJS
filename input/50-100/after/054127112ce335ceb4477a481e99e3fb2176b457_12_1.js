function (arg) {
    if (typeof arg !== "string") {
      return util.inspect(arg, false, 5, colored) + "\n"
    }
    if (!colored) arg = arg.replace(/\033\[[0-9;]*m/g, '')
    if (!npm.config.get("unicode")) {
      arg = arg.replace(/└/g, "`")
               .replace(/─/g, "-")
               .replace(/│/g, "|")
               .replace(/├/g, "+")
               .replace(/┬/g, "-")
    }
    return arg
  }