function (j, a) {
        if (a.getTimestamp() < min) {
          min = a.getTimestamp();
        }
        if ($.inArray(a.getValue(), ["cs", "cr", "ss", "sr"]) == -1) {
          a.services = d.services;
          a.annotations = d.annotations;
          annotation_data.push(a);
          annotation_to_row[a.getValue() + a.getTimestamp()] = i;
        }
      }