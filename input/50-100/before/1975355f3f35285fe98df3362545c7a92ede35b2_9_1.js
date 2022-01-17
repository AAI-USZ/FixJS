function TestDoc (schema) {
  var Subdocument = function () {
    EmbeddedDocument.call(this, {}, new DocumentArray);
  };

  /**
   * Inherits from EmbeddedDocument.
   */

  Subdocument.prototype.__proto__ = EmbeddedDocument.prototype;

  /**
   * Set schema.
   */

  var SubSchema = new Schema({
      title: { type: String }
  });

  Subdocument.prototype.setSchema(schema || SubSchema);

  return Subdocument;
}