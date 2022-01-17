function(value) {
      a.set({'name': value});
      equal(a.has("name"), false);
    }