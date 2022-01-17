function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var elementList1120 = opt_data.list;
  var elementListLen1120 = elementList1120.length;
  for (var elementIndex1120 = 0; elementIndex1120 < elementListLen1120; elementIndex1120++) {
    var elementData1120 = elementList1120[elementIndex1120];
    output.append('<div class="well"><h3>', soy.$$escapeHtml(elementData1120.title), '</h3></div><p>', soy.$$escapeHtml(elementData1120.body), '</p>');
  }
  return opt_sb ? '' : output.toString();
}