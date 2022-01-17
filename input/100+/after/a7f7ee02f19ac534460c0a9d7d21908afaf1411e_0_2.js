function(event) {
                  var link = $($('#links-tbl tr td a')[event.point.x]).attr('href');
                  if (link == undefined) {
                    link = $($('#'+name)[0]).attr('chart-href');
                    if (link.indexOf("~VAL2~") != -1) {
                      var strSplit = event.point.name.split(" ");
                      var val1 = strSplit[0];
                      var val2 = strSplit[1];
                      link = link.replace("~VAL2~", val2);
                    } else {
                      var val1 = event.point.name;
                      if (val1.indexOf(" ") != -1) val1 = '"' + val1 +'"';
                    }
                    link = link.replace("~VAL1~", val1);
                  }

                  if (link != undefined) {
                    window.location.href = link;
                  }
                }