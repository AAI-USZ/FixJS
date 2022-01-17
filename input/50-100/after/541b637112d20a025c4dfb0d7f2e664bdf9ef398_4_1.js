function createAnchor(annotation) {
  annotationAnchorAncestor = $('#' + annotation.ancestorId)[0] || document.body;
  annotationAnchor = $(annotationAnchorAncestor).parent().find(
                     ':contains("' + annotation.anchorText + '")').last();
  annotationAnchor.addClass('annotated');
  annotationAnchor.attr('annotation', annotation.annotationText);
}