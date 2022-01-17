function queryInfo(node) {
  var name = node.textContent;
  var file = location.pathname.replace(virtroot + '/' + tree + '/', '').replace('.html', '');
  var url = virtroot + sep + "getinfo.cgi?virtroot=" + virtroot;
  url += "&tree=" + tree;
  url += "&type=" + node.className + "&name=" + name;
  var attrs = node.attributes;
  for (var i = 0; i < attrs.length; i++) {
    var aname = attrs[i].name;
    var value = attrs[i].value;
    if (aname == 'class' || aname == 'aria-haspopup' || aname == 'href')
      continue;
    url += '&' + aname + '=' + encodeURIComponent(value);
  }

  showInfoDiv (node, node.innerHTML, "Loading...", -1);
  asyncRequest(url, node);
}