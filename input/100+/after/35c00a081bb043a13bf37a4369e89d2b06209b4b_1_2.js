function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h5>Favourites</h5><ul>');
  var favouriteList1149 = opt_data.favourites;
  var favouriteListLen1149 = favouriteList1149.length;
  for (var favouriteIndex1149 = 0; favouriteIndex1149 < favouriteListLen1149; favouriteIndex1149++) {
    var favouriteData1149 = favouriteList1149[favouriteIndex1149];
    output.append('<li><a href="#', soy.$$escapeHtml(favouriteData1149.url), '">', soy.$$escapeHtml(favouriteData1149.title), '</li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
}