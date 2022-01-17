function bind(mark) {
    do {
      var properties = mark.$properties;
      for (var i = properties.length - 1; i >= 0 ; i--) {
        var p = properties[i];
        if (!(p.name in seen)) {
          seen[p.name] = 1;
          switch (p.name) {
            case "data": data = p; break;
            case "visible": visible = p; break;
            default: types[p.type].push(p); break;
          }
        }
      }
    } while (mark = mark.proto);
  }