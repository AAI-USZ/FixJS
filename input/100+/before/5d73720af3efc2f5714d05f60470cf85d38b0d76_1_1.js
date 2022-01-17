function(style, packed) {
  self = this;
  var view_span = this.viewEnd - this.viewStart;
  var nf = new PHP_JS().number_format;
  var rel_start = (((Math.max(this.document.start, this.viewStart) - this.viewStart) / view_span) * (this.canvas.width-100)) + 50;
  var rel_end = (((Math.min(this.document.end, this.viewEnd) - this.viewStart) / view_span) * (this.canvas.width-100)) + 50;
  var rel_doc_length = rel_end - rel_start;
  var title = [];
  var doc_text = null;
  var doc_element = this.canvas.set();
  var doc_shape_bbox = null;
  var doc_text_bbox = null;
  var packed = typeof packed !== 'undefined' ? packed : true;
  var doc_shape = this.drawShape(rel_start, rel_end);
  for (var i in self.document) {
    title.push(i + ' : ' + self.document[i]);
  }
  doc_shape.attr(style);
  doc_shape_bbox = doc_shape.getBBox();
  doc_text = this.canvas.text(doc_shape_bbox.x, doc_shape_bbox.y-1-doc_shape_bbox.height/2).attr({
    'text': self.document.name,
    'text-anchor': 'start'
  });
  doc_text_bbox = doc_text.getBBox();
  doc_element.push(doc_shape);
  if (self.document.name === undefined || (packed && doc_text_bbox.width > doc_shape_bbox.width)) {
    doc_text.remove();
  } else {
    doc_element.push(doc_text);
  }
  doc_element.attr({
    title: title.join('\n'),
    cursor: 'help'
  });
  this.glyph = doc_element;
  return doc_element;
}