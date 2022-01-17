function (data, filters) {
            var filtered_data = data,
                filter;

            filtered_data = filtered_data.filter(function(record) {
                for (filter in filters) {
                    if (filters.hasOwnProperty(filter)) {
                        var d = record[filter];
                        var f = filters[filter];
                        if (filter == "elevation") {
                                if (d != null && d <= f[0] && d >= f[1])
                                        return false;
                        }
                        else if (filter == "date") {
                          if (record["year"] == null)
                              return false;

                          if (record["year"] != null && (record["year"] < f[0].getFullYear() || record["year"] > f[1].getFullYear())) {
                             return false;
                          } else if (record["year"] != null && (record["year"] == f[0].getFullYear() || record["year"] == f[1].getFullYear())) {
                            if (record["month"] != null && (record["month"] < f[0].getMonth()+1 || record["month"] > f[1].getMonth()+1)) {
                                return false;
                            } else if (record["month"] != null && (record["month"] == f[0].getMonth()+1 || record["month"] == f[1].getMonth()+1)) {
                              if (record["day"] != null && (record["day"] < f[0].getDate() || record["day"] > f[1].getDate()))
                                  return false;
                            }
                          }
                        }
                        else {
                            var hit = false;
                            for (var j = 0; j < f.length; j++) {
                                if (f[j] == "None (CANADA)")
                                    f[j] = null;
                                if (d == f[j])
                                    hit = true; 
                            }
                            if (!hit)
                                return false;
                        } 
                    }
                }
                return true;
            });

            return filtered_data;
        }