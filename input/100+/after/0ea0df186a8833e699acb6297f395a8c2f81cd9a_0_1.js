function(k) {
              if (k.key in data) {
                html += "<li><b>" + k.name + "</b>: ";
                if (k.key == 'jobId' && data['trackingUrl'] != null) {
                  html += "<a href=\"" + data['trackingUrl'] + "\" target=\"__blank\">" + data[k.key] + "</a>";
                } else {
                  html += '<span id="' + data.jobId + '_' + k.key.replace(/\s+/, '_') + '">' + data[k.key] + '</span>';
                }
                html += "</li>";
              }
            }