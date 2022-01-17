function (fmt, obj, named) {
  if (!fmt) return "";
  if (Array.isArray(obj) || named === false) {
    return fmt.replace(/%s/g, function(match){return String(obj.shift())});
  } else if (typeof obj === 'object' || named === true) {
    return fmt.replace(/%\(\s*([^)]+)\s*\)/g, function(m, v){
      return String(obj[v]);
    });
  } else {
    return fmt;
  }
}