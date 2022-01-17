function(element) {
  var values = {};
  var preferredMethod = null;

  // FIXME: This function needs a lot more thought, for example the "value" property is much
  // more useful for type="submit".
  // TODO: set locator.frame to be a locator to the frame containing the element
  
  // Locate by ID
  var id = element.getAttribute('id');
  if (id) {
    values[builder.locator.methods.id] = id;
    values[builder.locator.methods.css] = "#" + id;
    if (findNode("id", id) === element) {
      preferredMethod = builder.locator.methods.id;
    }
  }
  
  // Locate by name
  var name = element.getAttribute('name');
  if (name) {
    values[builder.locator.methods.name] = name;
    if (!preferredMethod && findNode("name", name) === element) {
      preferredMethod = builder.locator.methods.name;
    }
  }
  
  // Locate by link text
  if ((element.tagName.toUpperCase() === "A") ||
      (element.parentNode.tagName && element.parentNode.tagName.toUpperCase() === "A")) 
  {
    var link = removeHTMLTags(element.innerHTML);
    if (link) {
      values[builder.locator.methods.link] = link;
      if (!preferredMethod && findNode("link", link) === element) {
        preferredMethod = builder.locator.methods.link;
      }
    }
  }
  
  // Locate by XPath
  var xpath = getHtmlXPath(element);
  if (xpath) {
    // Contrary to the XPath spec, Selenium requires the "//" at the start, even for paths that 
    // don't start at the root.
    xpath = (xpath.substring(0, 2) !== "//" ? ("/" + xpath) : xpath);
    values[builder.locator.methods.xpath] = xpath;
    if (!preferredMethod) {
      preferredMethod = builder.locator.methods.xpath;
    }
  }
  
  // Locate by class 
  var className = element.getAttribute('class');
  if (className && !values[builder.locator.methods.css]) {
    values[builder.locator.methods.css] = element.tagName.toLowerCase() + "." + className.replace(/ .*/, '');
    if (!preferredMethod) {
      preferredMethod = builder.locator.methods.css;
    }
  }
  
  return new builder.locator.Locator(preferredMethod, values);
}