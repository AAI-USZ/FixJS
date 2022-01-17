function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li><a href="#', soy.$$escapeHtml(opt_data.endUrl), '">', soy.$$escapeHtml(opt_data.text), '</a></li><hr>');
  return opt_sb ? '' : output.toString();
}