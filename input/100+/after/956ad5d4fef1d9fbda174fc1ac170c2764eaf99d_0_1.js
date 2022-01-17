function(doc, view_start, view_end, layer, style) {
  var view_span = view_end - view_start
    , nf = new PHP_JS().number_format
    , rel_start = (((Math.max(doc.start, view_start) - view_start) / view_span) * (this.width-100)) + 50
    , rel_end = (((Math.min(doc.end, view_end) - view_start) / view_span) * (this.width-100)) + 50
    , rel_doc_length = rel_end - rel_start
    , title = []
    , doc_shape = null
    , doc_text = null
    , doc_element = this.set()
    , doc_shape_bbox = null;
  if (doc.strand) {
    doc_shape = this.path(traceOrientedGlyph(rel_start, rel_end, layer, doc.strand));
  } else {
    doc_shape = this.rect(rel_start, 20+20*layer, rel_doc_length, 10);
  }
  for (var i in doc) {
    title.push(i + ' : ' + doc[i]);
  }
  doc_shape.attr({ title: title.join('\n') });
  doc_shape.attr(style);
  doc_shape_bbox = doc_shape.getBBox();
  doc_text = this.text(doc_shape_bbox.x+doc_shape_bbox.width/2, doc_shape_bbox.y-1-doc_shape_bbox.height/2, doc.name);
  doc_text_bbox = doc_text.getBBox();
  doc_element.push(doc_shape);
  if (doc_text_bbox.width > doc_shape_bbox.width || doc.name === undefined) {
    doc_text.remove();
  } else {
    doc_element.push(doc_text);
  }
  return doc_element;
}