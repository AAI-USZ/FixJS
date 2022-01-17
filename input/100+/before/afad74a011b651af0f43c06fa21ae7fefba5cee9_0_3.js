function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div style="min-height: 48px"><div style="float:left; position:relative"><a href="#', soy.$$escapeHtml(opt_data.type), '/', soy.$$escapeHtml(opt_data.id), '"><img alt="" src="', soy.$$escapeHtml(opt_data.thumbnail), '" class="thumbnail"></a></div><div style="margin-left:60px"><div><a href="#', soy.$$escapeHtml(opt_data.type), '/', soy.$$escapeHtml(opt_data.id), '">', soy.$$escapeHtml(opt_data.name), '</a>', (opt_data.group == null) ? '<button style="float:right" class="btn btn-success btn-small" id="addGroup">Add to group</button><div id="groupName" style="float:right; display:none" class="alert alert-info"></div>' : '<div style="float:right" class="alert alert-info">' + soy.$$escapeHtml(opt_data.group.name) + '</div>', '</div>', (opt_data.city != null) ? '<div>City: ' + soy.$$escapeHtml(opt_data.city.name) + '</div>' : '<div>&nbsp; </div>');
  if (opt_data.favourites != null) {
    output.append('<div><strong>Interests</strong></div><ul>');
    var favouriteList1221 = opt_data.favourites;
    var favouriteListLen1221 = favouriteList1221.length;
    for (var favouriteIndex1221 = 0; favouriteIndex1221 < favouriteListLen1221; favouriteIndex1221++) {
      var favouriteData1221 = favouriteList1221[favouriteIndex1221];
      output.append('<li>', soy.$$escapeHtml(favouriteData1221.name), '</li>');
    }
    output.append('</ul>');
  }
  if (opt_data.friends != null) {
    output.append('<div><strong>Friends in common</strong></div><ul>');
    var friendList1233 = opt_data.friends;
    var friendListLen1233 = friendList1233.length;
    for (var friendIndex1233 = 0; friendIndex1233 < friendListLen1233; friendIndex1233++) {
      var friendData1233 = friendList1233[friendIndex1233];
      output.append('<li>', soy.$$escapeHtml(friendData1233.name), '</li>');
    }
    output.append('</ul>');
  }
  if (opt_data.highlights.length > 0) {
    output.append('<div><pre>');
    var resList1242 = opt_data.highlights;
    var resListLen1242 = resList1242.length;
    for (var resIndex1242 = 0; resIndex1242 < resListLen1242; resIndex1242++) {
      var resData1242 = resList1242[resIndex1242];
      output.append('<div style="padding:10px"><strong>', soy.$$escapeHtml(resData1242.title), '</strong><div>', soy.$$escapeHtml(resData1242.body), '</div></div>');
    }
    output.append('</pre></div>');
  }
  output.append('</div></div><hr>');
  return opt_sb ? '' : output.toString();
}