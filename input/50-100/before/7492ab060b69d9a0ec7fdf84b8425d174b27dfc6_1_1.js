function(name, normalize) {
    var parts = name.split(']');
    parts[0] = normalize(parts[0]);
    return parts.join(']');
  }