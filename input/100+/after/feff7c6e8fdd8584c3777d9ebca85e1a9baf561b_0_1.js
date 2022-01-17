function() {
  if (!this.isValid()) {
    throw new Error(this.constructor.name +
                    " object has no attribute 'cleanedData'")
  }
  var cleaned = []
  for (var i = 0, l = this.forms.length; i < l; i++) {
    // Don't add data marked for deletion
    if (this.canDelete && this._shouldDeleteForm(this.forms[i])) {
      continue
    }
    // Value of deletion field is getting saved to the cleanedData
    // So, we null out the fields value before we save the data
    if (this.canDelete && !this._shouldDeleteForm(this.forms[i])) {
      cleanedData = this.forms[i].cleanedData;
      cleanedData[DELETION_FIELD_NAME] = undefined;
      cleaned.push(cleanedData);
      continue
    }
    cleaned.push(this.forms[i].cleanedData)
  }
  return cleaned
}