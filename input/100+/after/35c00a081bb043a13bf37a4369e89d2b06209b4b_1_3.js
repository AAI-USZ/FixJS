function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div style="min-height: 48px"><div style="float:left; position:relative"><a href="#', soy.$$escapeHtml(opt_data.type), '/', soy.$$escapeHtml(opt_data.id), '"><img alt="" src="', soy.$$escapeHtml(opt_data.thumbnail), '" class="thumbnail"></a></div><div style="margin-left:60px"><div><a href="#', soy.$$escapeHtml(opt_data.type), '/', soy.$$escapeHtml(opt_data.id), '">', soy.$$escapeHtml(opt_data.name), '</a>', (opt_data.group == null) ? '<button style="float:right" class="btn btn-success btn-small" id="addGroup">Add to group</button><div id="groupName" style="float:right; display:none" class="alert alert-info"></div>' : '<div style="float:right" class="alert alert-info">' + soy.$$escapeHtml(opt_data.group.name) + '</div>', '</div>', (opt_data.city != null) ? '<div>City: ' + soy.$$escapeHtml(opt_data.city.name) + '</div>' : '<div>&nbsp; </div>');
  if (opt_data.favourites != null) {
    output.append('<div><strong>Interests</strong></div><ul>');
    var favouriteList1283 = opt_data.favourites;
    var favouriteListLen1283 = favouriteList1283.length;
    for (var favouriteIndex1283 = 0; favouriteIndex1283 < favouriteListLen1283; favouriteIndex1283++) {
      var favouriteData1283 = favouriteList1283[favouriteIndex1283];
      output.append('<li>', soy.$$escapeHtml(favouriteData1283.name), '</li>');
    }
    output.append('</ul>');
  }
  if (opt_data.friends != null) {
    output.append('<div><strong>Friends in common</strong></div><ul>');
    var friendList1295 = opt_data.friends;
    var friendListLen1295 = friendList1295.length;
    for (var friendIndex1295 = 0; friendIndex1295 < friendListLen1295; friendIndex1295++) {
      var friendData1295 = friendList1295[friendIndex1295];
      output.append('<li>', soy.$$escapeHtml(friendData1295.name), '</li>');
    }
    output.append('</ul>');
  }
  if (opt_data.highlights.length > 0) {
    output.append('<div><pre>');
    var resList1304 = opt_data.highlights;
    var resListLen1304 = resList1304.length;
    for (var resIndex1304 = 0; resIndex1304 < resListLen1304; resIndex1304++) {
      var resData1304 = resList1304[resIndex1304];
      output.append('<div style="padding:10px"><strong>', soy.$$escapeHtml(resData1304.title), '</strong><div>', soy.$$escapeHtml(resData1304.body), '</div></div>');
    }
    output.append('</pre></div>');
  }
  output.append('</div></div><hr>');
  return opt_sb ? '' : output.toString();
}