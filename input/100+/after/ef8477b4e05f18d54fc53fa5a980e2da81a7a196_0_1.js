function(map)
    {
      var html = [];
      var special = this.__special;
      var cssNames = this.__cssNames;
      var name, value;

      for (name in map)
      {
        // read value
        value = map[name];
        if (value == null) {
          continue;
        }

        // normalize name
        name = this.__styleNames[name] || this.__getStyleName(name) || name;

        // process special properties
        if (special[name]) {
          html.push(special[name].compile(value));
        } else {
          if (!cssNames[name]) {
            cssNames[name] = qx.lang.String.hyphenate(name);
          }
          html.push(cssNames[name], ":", value, ";");
        }
      }

      return html.join("");
    }