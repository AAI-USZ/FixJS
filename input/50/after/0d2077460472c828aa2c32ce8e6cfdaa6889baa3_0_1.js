function(str) {
  try {
    if (0 == str.indexOf('j:')) {
      return JSON.parse(str.slice(2));
    }
  } catch (err) {
    // no op
  }
}