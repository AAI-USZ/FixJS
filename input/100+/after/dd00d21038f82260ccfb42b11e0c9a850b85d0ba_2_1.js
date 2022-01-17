function(map)
    {
      var html = [];
      var special = this.__special;
      var names = qx.bom.Style.CSSNAMES;
      var name, value;

      for (name in map)
      {
        // read value
        value = map[name];
        if (value == null) {
          continue;
        }

        // normalize name
        name = names[name] || name;

        // process special properties
        if (special[name]) {
          html.push(special[name].compile(value));
        } else {
          html.push(qx.lang.String.hyphenate(name), ":", value, ";");
        }
      }

      return html.join("");
    }