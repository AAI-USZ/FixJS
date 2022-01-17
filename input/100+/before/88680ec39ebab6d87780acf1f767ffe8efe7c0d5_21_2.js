function(element) {
  var node = element.parentNode;
  var subGroup = eXo.core.DOMUtil.findFirstChildByClass(node, "div", "NodeGroup");
  if (element.className == "EmptyIcon")
    return true;
  if (!subGroup)
    return false;
  if (subGroup.style.display == "none") {
    if (element.className == "ExpandIcon")
      element.className = "CollapseIcon";
    subGroup.style.display = "block";
  } else {
    if (element.className == "CollapseIcon")
      element.className = "ExpandIcon";
    subGroup.style.display = "none";
  }
  return true;
}