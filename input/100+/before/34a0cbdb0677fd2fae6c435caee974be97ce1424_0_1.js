f  var value;
  if (!node && this.node) {
    node = this.node;
  }
  node = (node.nodeType == 1) ? node : node.parentNode;
  /*
  if (!node || !node.ownerDocument) {
    console.error("NO NODE!");
    debugger;
  }
  */
  if (_localCssProperties.indexOf(propertyName) >= 0) {
    // We don't trust getComputedStyle since it returns used values for these
    // properties, so we instead look to see what the node itself has
    // specified.
    value = node.style[toCamelCase(propertyName)];


    // If we don't get something from the node, we try to honour ID-targeted
    // rules. We're not looking to understand "!important", settle ordering
    // issues, handle linked sheets, etc. This is purely a hack.
    if (!value) {
      // FIXME: expensive, cache!
      value = "auto";
      var id = node.id;
      if (id) {
        var idRe = new RegExp("\#"+id+"\\s*{");
        toArray(node.ownerDocument.styleSheets).forEach(function(sheetList) {
          toArray(sheetList).forEach(function(sheet) {
            toArray(sheet.cssRules).forEach(function(rule) {
              if (rule.type == 1) {
                if (rule.cssText.search(idRe) == 0) {
                  var tv = rule.style[toCamelCase(propertyName)];
                  if (tv) {
                    value = tv;
                  }
                }
              }
            });
          });
        });
      }
    }
  } else {
    value = node.ownerDocument.defaultView.getComputedStyle(node).getPropertyValue(propertyName);
  }
  return new CSSValue(value, propertyName);
};
