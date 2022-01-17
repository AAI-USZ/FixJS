function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var elementList1158 = opt_data.list;
  var elementListLen1158 = elementList1158.length;
  for (var elementIndex1158 = 0; elementIndex1158 < elementListLen1158; elementIndex1158++) {
    var elementData1158 = elementList1158[elementIndex1158];
    output.append('<div class="well"><h3>', soy.$$escapeHtml(elementData1158.title), '</h3></div><p>', soy.$$escapeHtml(elementData1158.body), '</p>');
  }
  return opt_sb ? '' : output.toString();
}