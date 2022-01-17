function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div style="min-height: 48px"><div style="float:left; position:relative"><a href="#', soy.$$escapeHtml(opt_data.type), '/', soy.$$escapeHtml(opt_data.id), '"><img alt="" src="', soy.$$escapeHtml(opt_data.thumbnail), '" class="thumbnail"></a></div><div style="margin-left:60px"><div><a href="#', soy.$$escapeHtml(opt_data.type), '/', soy.$$escapeHtml(opt_data.id), '">', soy.$$escapeHtml(opt_data.name), '</a>', (opt_data.group == null) ? '<button style="float:right" class="btn btn-success btn-small" id="addGroup">Add to group</button><div id="groupName" style="float:right; display:none" class="alert alert-info"></div>' : '<div style="float:right" class="alert alert-info">' + soy.$$escapeHtml(opt_data.group.name) + '</div>', '</div>', (opt_data.city != null) ? '<div>City: ' + soy.$$escapeHtml(opt_data.city.name) + '</div>' : '<div>&nbsp; </div>');
  if (opt_data.favourites != null) {
    output.append('<div><strong>Interests</strong></div><ul>');
    var favouriteList1245 = opt_data.favourites;
    var favouriteListLen1245 = favouriteList1245.length;
    for (var favouriteIndex1245 = 0; favouriteIndex1245 < favouriteListLen1245; favouriteIndex1245++) {
      var favouriteData1245 = favouriteList1245[favouriteIndex1245];
      output.append('<li>', soy.$$escapeHtml(favouriteData1245.name), '</li>');
    }
    output.append('</ul>');
  }
  if (opt_data.friends != null) {
    output.append('<div><strong>Friends in common</strong></div><ul>');
    var friendList1257 = opt_data.friends;
    var friendListLen1257 = friendList1257.length;
    for (var friendIndex1257 = 0; friendIndex1257 < friendListLen1257; friendIndex1257++) {
      var friendData1257 = friendList1257[friendIndex1257];
      output.append('<li>', soy.$$escapeHtml(friendData1257.name), '</li>');
    }
    output.append('</ul>');
  }
  if (opt_data.highlights.length > 0) {
    output.append('<div><pre>');
    var resList1266 = opt_data.highlights;
    var resListLen1266 = resList1266.length;
    for (var resIndex1266 = 0; resIndex1266 < resListLen1266; resIndex1266++) {
      var resData1266 = resList1266[resIndex1266];
      output.append('<div style="padding:10px"><strong>', soy.$$escapeHtml(resData1266.title), '</strong><div>', soy.$$escapeHtml(resData1266.body), '</div></div>');
    }
    output.append('</pre></div>');
  }
  output.append('</div></div><hr>');
  return opt_sb ? '' : output.toString();
}