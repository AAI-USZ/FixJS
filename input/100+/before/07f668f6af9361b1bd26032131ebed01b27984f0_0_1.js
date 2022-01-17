function(k) {
              if (k.key in data) {
                if (k.key == 'jobId') {
                  html += "<li><b>" + k.name + "</b>: <a href=\"http://hadoop-dw-jt.smf1.twitter.com:50030/jobdetails.jsp?jobid=" +
                  data[k.key] + "\" target=\"__blank\">" + data[k.key] + "</a></li>";
                } else {
                  html += '<li><b>' + k.name + '</b>: <span id="'
                    + data.jobId + '_' + k.key.replace(/\s+/, '_') + '">'
                    + data[k.key] + '</span></li>';
                }
              }
            }