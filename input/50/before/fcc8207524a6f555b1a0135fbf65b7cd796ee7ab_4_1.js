function checkForTransformAddition(aEvent) {
  if (aEvent.attrName == "style" && aEvent.target.style.MozTransform) {
    transformChanged = true;
  }
}