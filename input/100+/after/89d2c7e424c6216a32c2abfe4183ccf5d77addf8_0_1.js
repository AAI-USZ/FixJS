function(element) {
  var cssSelector = Utils.getCssLocator(element);
  var id = element.getAttribute("id") != undefined ? element.getAttribute("id") : null;
  // To respond to if they contain a newline in <a> tags text.
  var linkText = element.nodeName.toLowerCase() == "a" ? $(element).text().trim().split("\n")[0] : null;
  var name = element.getAttribute("name") != undefined ? element.getAttribute("name") : null;
  var xpath = Utils.getXPathLocator(element);

  var locators = new Array();

  if (id != null) {
    locators.push({type:"id", value:id});
  }

  if (name != null) {
    locators.push({type:"name", value:name});
  }

  locators.push({type:"cssSelector", value:cssSelector});
  // TODO
  //locators.push({type:"xpath", value:xpath});
  if (linkText != null && linkText !== "") {
    locators.push({type:"linkText", value:linkText});
  }
  return locators;
}