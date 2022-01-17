function(element) {
  var node = element.parentNode;
  var subGroup = gj(node).find('div.NodeGroup')[0];
  if (element.className == "EmptyIcon")
    return true;
  if (!subGroup) {
    element.className = "CollapseIcon";
    return false;
  }
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