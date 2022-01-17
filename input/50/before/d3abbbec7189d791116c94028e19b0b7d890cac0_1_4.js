function(value) {
      a.set({'name': value});
      equals(a.has("name"), false);
    }