function (j, a) {
        if (a.getTimestamp() < min) {
          min = a.getTimestamp();
        }
        if ($.inArray(a.getValue(), ["Client send", "Client receive", "Server send", "Server receive"]) == -1) {
          a.services = d.services;
          a.annotations = d.annotations;
          annotation_data.push(a);
          annotation_to_row[a.getValue() + a.getTimestamp()] = i;
        }
      }