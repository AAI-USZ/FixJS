function onTabViewHidden() {
  window.removeEventListener("tabviewhidden", onTabViewHidden, false);

  ok(frontChanged, "the CSS class 'front' was added while zooming in");
  ok(transformChanged, "the CSS class '-moz-transform' was modified while " +
     "zooming in");

  frontChanged = transformChanged = false;
  tab.$container[0].removeEventListener("DOMAttrModified",
                                        checkForFrontAddition, false);
  tab.$container[0].addEventListener("DOMAttrModified", checkForFrontRemoval,
                                     false);

  window.addEventListener("tabviewshown", onTabViewShownAgain, false);
  TabView.toggle();
}