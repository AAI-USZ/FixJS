function() {
  this.fields.title = trimTo(this.fields.title, MAX_CHARS_PER_FIELD);
  this.fields.description = trimTo(this.fields.description,
      MAX_CHARS_PER_FIELD);
  this.fields.location = trimTo(this.fields.location, MAX_CHARS_PER_FIELD);
}