function envReplace (f) {
  if (typeof f !== "string" || !f) return f

  // replace any ${ENV} values with the appropriate environ.
  var envExpr = /(\\*)\$\{([^}]+)\}/g
  return f.replace(envExpr, function (orig, esc, name, i, s) {
    esc = esc.length && esc.length % 2
    if (esc) return orig
    if (undefined === process.env[name]) {
      throw new Error("Failed to replace env in config: "+orig)
    }
    return process.env[name]
  }}
