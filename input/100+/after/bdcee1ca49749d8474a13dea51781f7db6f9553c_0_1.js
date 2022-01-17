function(vendor, attr_id) {
      if (!attributes_map[vendor])
        attributes_map[vendor] = {};

      if (!attributes_map[vendor][attr_id])
        attributes_map[vendor][attr_id] = [null, null, null, {}, {}, {}];
    }