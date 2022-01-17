function(element, name, smart)
    {
      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;

      // special handling for specific properties
      if (smart!==false && this.__special[name]) {
        return this.__special[name].reset(element);
      } else {
        element.style[name] = "";
      }
    }