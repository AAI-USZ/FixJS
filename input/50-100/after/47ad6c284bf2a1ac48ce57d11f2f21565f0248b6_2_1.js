function() {
  this.fields.title = common.trimTo(this.fields.title, MAX_CHARS_PER_FIELD);
  this.fields.description = common.trimTo(this.fields.description,
      MAX_CHARS_PER_FIELD);
  this.fields.location = common.trimTo(this.fields.location, MAX_CHARS_PER_FIELD);
}