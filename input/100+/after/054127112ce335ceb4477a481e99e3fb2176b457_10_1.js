function (i) {
    if (i.charAt(0) === "_" && i.indexOf("_"+namePref) !== 0) {
      return
    }
    var value = ini.get(i)
    if (/^(log|out)fd$/.test(i) && typeof value === "object") {
      // not an fd, a stream
      return
    }
    if (!value) value = ""
    else if (typeof value !== "string") value = JSON.stringify(value)

    value = -1 !== value.indexOf("\n")
          ? JSON.stringify(value)
          : value
    i = i.replace(/^_+/, "")
    if (i.indexOf(namePref) === 0) {
      var k = i.substr(namePref.length).replace(/[^a-zA-Z0-9_]/g, "_")
      pkgConfig[ k ] = value
    } else if (i.indexOf(verPref) === 0) {
      var k = i.substr(verPref.length).replace(/[^a-zA-Z0-9_]/g, "_")
      pkgVerConfig[ k ] = value
    }
    var envKey = (prefix+i).replace(/[^a-zA-Z0-9_]/g, "_")
    env[envKey] = value
  }