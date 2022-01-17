function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h5>Favourites</h5><ul>');
  var favouriteList1087 = opt_data.favourites;
  var favouriteListLen1087 = favouriteList1087.length;
  for (var favouriteIndex1087 = 0; favouriteIndex1087 < favouriteListLen1087; favouriteIndex1087++) {
    var favouriteData1087 = favouriteList1087[favouriteIndex1087];
    output.append('<li><a href="#', soy.$$escapeHtml(favouriteData1087.url), '">', soy.$$escapeHtml(favouriteData1087.title), '</li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
}