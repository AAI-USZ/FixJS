function (doc) {
  return this.get('_id') === doc.get('_id');
}