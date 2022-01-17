function() {
  if (!this.isValid()) {
    throw new Error(this.constructor.name +
                    " object has no attribute 'cleanedData'")
  }
  var cleaned = []
  for (var i = 0, l = this.forms.length; i < l; i++) {
    cleaned.push(this.forms[i].cleanedData)
  }
  return cleaned
}