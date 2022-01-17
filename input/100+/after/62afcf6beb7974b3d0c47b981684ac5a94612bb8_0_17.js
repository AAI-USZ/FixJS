function() {
      var argnames, mac, name, template;
      argnames = arguments[0], template = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      name = argnames.items.shift();
      mac = new C.Macro({
        name: name,
        argnames: argnames,
        template: template
      });
      return new C.Raw(mac.compile());
    }