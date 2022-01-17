function showInfo(node) {
  var name = node.textContent;
  var line = node.parentNode.id.replace('l', '');
  var file = location.pathname.replace(virtroot + tree + '/', '').replace('.html', '');
  var url = virtroot + "cgi-bin/getinfo.cgi?virtroot=" + virtroot;
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

  if (infoDiv) {
    closeInfo();
  }

  var id = 'info-div-' + infoDivID++;
  var treediv = 'tree-' + infoDivID;
  infoDiv = new dojox.layout.ContentPane({
    id: id,
    content: '<div class="info"><div id="' + treediv + '"></div></div>',
    style: "margin:0; padding:0; white-space: normal !important;" +
           "position: absolute; width: 100%"
  });
  infoDiv.placeAt(node, "after");
  dojo.xhrGet({ url: url,
    load: function (response, ioArgs) {
      try {
        buildTree(JSON.parse(response), treediv);
      } catch (e) {
        if (e instanceof SyntaxError) {
          infoDiv.set('content', response);
        } else {
          throw e;
        }
      }
      return response;
    }
  });
  try {
    if (styleRule >= 0)
      document.styleSheets[0].deleteRule(styleRule);
    styleRule = document.styleSheets[0].insertRule('a[rid="' +
      node.getAttribute("rid") + '"] { background-color: #ffc; }',
      document.styleSheets[0].length - 1);
  } catch (e) {
    styleRule = -1;
  }

  // TODO: this needs to happen in an onLoad or onDownloadEnd event vs. here...
  dojo.fx.wipeIn({node: infoDiv.id, duration: 500}).play();
}