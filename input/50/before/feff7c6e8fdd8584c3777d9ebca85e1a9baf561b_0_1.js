function(form) {
  // The way we lookup the value of the deletion field here takes
  // more code than we'd like, but the form's cleanedData will not
  // exist if the form is invalid.
  var field = form.fields[DELETION_FIELD_NAME]
    , rawValue = form._rawValue(DELETION_FIELD_NAME)
    , shouldDelete = field.clean(rawValue)
  return shouldDelete
}