function(content) {
  var lines = content.split("\n");

  var vendor = NO_VENDOR, includes = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    line = line.replace(/#.*/, "").replace(/\s+/g, " ");

    var match = line.match(/^\s*VENDOR\s+(\S+)\s+(\d+)/);
    if (match) {
      vendor_name_to_id[match[1]] = match[2];
      continue;
    }

    if ((match = line.match(/^\s*BEGIN-VENDOR\s+(\S+)/))) {
      vendor = vendor_name_to_id[match[1]];
      continue;
    }

    if (line.match(/^\s*END-VENDOR/)) {
      vendor = NO_VENDOR;
      continue;
    }

    match = line.match(/^\s*(?:VENDOR)?ATTR(?:IBUTE)?\s+(\d+)?\s*(\S+)\s+(\d+)\s+(\S+)\s*(.+)?/);
    if (match) {
      var attr_vendor = vendor;
      if (match[1] !== undefined)
        attr_vendor = match[1];

      if (!attributes_map[attr_vendor])
        attributes_map[attr_vendor] = {};

      var modifiers = {};
      if (match[5] !== undefined) {
        match[5].replace(/\s*/g, "").split(",").forEach(function(m) {
          modifiers[m] = true;
        });
      }

      attributes_map[attr_vendor][match[3]] = [match[3], match[2], match[4], {}, {}, modifiers];
      attributes_map[attr_vendor][match[2]] = attributes_map[attr_vendor][match[3]];

      continue;
    }

    match = line.match(/^\s*(?:VENDOR)?VALUE\s+(\d+)?\s*(\S+)\s+(\S+)\s+(\d+)/);
    if (match) {
      var attr_vendor = vendor;
      if (match[1] !== undefined)
        attr_vendor = match[1];

      attributes_map[attr_vendor][match[2]][ATTR_ENUM][match[4]] = match[3];
      attributes_map[attr_vendor][match[2]][ATTR_REVERSE_ENUM][match[3]] = match[4];

      continue;
    }

    if ((match = line.match(/^\s*\$INCLUDE\s+(.*)/))) {
      includes.push(match[1]);
    }
  }

  return includes;
}