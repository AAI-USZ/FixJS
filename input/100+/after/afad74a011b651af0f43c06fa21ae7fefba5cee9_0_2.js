function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h5>Favourites</h5><ul>');
  var favouriteList1111 = opt_data.favourites;
  var favouriteListLen1111 = favouriteList1111.length;
  for (var favouriteIndex1111 = 0; favouriteIndex1111 < favouriteListLen1111; favouriteIndex1111++) {
    var favouriteData1111 = favouriteList1111[favouriteIndex1111];
    output.append('<li><a href="#', soy.$$escapeHtml(favouriteData1111.url), '">', soy.$$escapeHtml(favouriteData1111.title), '</li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
}