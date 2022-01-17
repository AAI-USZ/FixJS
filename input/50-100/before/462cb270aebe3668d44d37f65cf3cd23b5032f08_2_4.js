function (v) {
      var value = data[v];
      if (typeof value !== "string")
        value = JSON.stringify(value);
      var input = new Element("input",
        { type : "hidden", name : v, value : value });
      form.appendChild(input);
    }