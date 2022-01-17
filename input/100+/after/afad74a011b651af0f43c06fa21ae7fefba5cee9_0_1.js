function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  switch (opt_data.type) {
    case 'Wixet\\WixetBundle\\Entity\\PrivateMessage':
      output.append('<a href="#messages">', soy.$$escapeHtml(opt_data.total), ' Private messages</a>');
      break;
    default:
      output.append('<a href="#">', soy.$$escapeHtml(opt_data.total), ' ', soy.$$escapeHtml(opt_data.type), '</a>');
  }
  return opt_sb ? '' : output.toString();
}