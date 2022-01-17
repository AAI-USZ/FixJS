function checkForTransformAddition(aEvent) {
  if (aEvent.attrName == "style" && aEvent.target.style.transform) {
    transformChanged = true;
  }
}