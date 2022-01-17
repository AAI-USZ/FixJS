function dotCompletion (str, regex, skipPrefix) {
  var getProps = this.options.hasOwnProperty("enumerablePropsOnly") &&
    this.options.enumerablePropsOnly ? this.enumerate.bind(this) :
    this.getAllProperties.bind(this);
  var addPrefix = skipPrefix ? "" : str + ".";
  var obj;
  try {
    obj = str === null ? this.global : this.evaluate ? this.evaluate(str) : this.global.eval(str);
  } catch (e) {
    console.log("completion eval error: %s", e);
    obj = null;
  }
  if (obj === null || obj === undefined)
    return [];
  var r = [];
  getProps(
    obj, function (name) {
      // Filter out numeric indices
      if(!name.match(/^[0-9]*$/)) {
        if (regex) {
          if (name.match(regex))
            r.push(addPrefix + name);
        } else {
          r.push(addPrefix + name);
        }
      }
    });

  return r;
}