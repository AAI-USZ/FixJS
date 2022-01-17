function resolve (framework) {
  debug('resolving framework name or path:', framework)
  // strip off a trailing slash if present
  if (framework[framework.length - 1] == '/') {
    framework = framework.slice(0, framework.length - 1)
    debug('stripped trailing slash:', framework)
  }
  // already absolute, return as-is
  if (~framework.indexOf('/')) {
    return framework
  }
  var rtn = null
  for (var i = 0; i < exoports.PATH.length; i++) {
    rtn = join(exports.PATH[i], framework + SUFFIX)
    if (exists(rtn)) {
      return rtn
    }
  }
  throw new Error('Could not resolve framework: ' + framework)
}