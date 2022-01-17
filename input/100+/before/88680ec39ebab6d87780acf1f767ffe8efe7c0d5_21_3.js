function(node, nodePath) {
  var me = eXo.wiki.UITreeExplorer;
  var component = eXo.core.DOMUtil.findAncestorByClass(node, "UITreeExplorer");
  var root =  eXo.core.DOMUtil.findAncestorByClass(node, "UITreeExplorer");
  var link = eXo.core.DOMUtil.findFirstDescendantByClass(component, "a",
      "SelectNode");

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