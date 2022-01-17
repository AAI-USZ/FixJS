function(node, nodePath) {
  var me = eXo.wiki.UITreeExplorer;
  var component = gj(node).closest(".UITreeExplorer");
  var link = gj(component).find('a.SelectNode')[0];

  var endParamIndex = link.href.lastIndexOf("')");
  var param = "&objectId";
  var modeIndex = link.href.indexOf(param);
  if (endParamIndex > 0) {
    if (modeIndex < 0)
      link.href = link.href.substring(0, endParamIndex) + param + "="
          + nodePath + "')";
    else
      link.href = link.href.substring(0, modeIndex) + param + "=" + nodePath
          + "')";
  } else {
    if (modeIndex < 0)
      link.href = link.href.substring(0, link.href.length) + param + "="
          + nodePath;
    else
      link.href = link.href.substring(0, modeIndex) + param + "=" + nodePath;
  }
  window.location = link.href;

}