function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var elementList1096 = opt_data.list;
  var elementListLen1096 = elementList1096.length;
  for (var elementIndex1096 = 0; elementIndex1096 < elementListLen1096; elementIndex1096++) {
    var elementData1096 = elementList1096[elementIndex1096];
    output.append('<div class="well"><h3>', soy.$$escapeHtml(elementData1096.title), '</h3></div><p>', soy.$$escapeHtml(elementData1096.body), '</p>');
  }
  return opt_sb ? '' : output.toString();
}