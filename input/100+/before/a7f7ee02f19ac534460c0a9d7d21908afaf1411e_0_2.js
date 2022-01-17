function(event) {
                  var link = $($('#links-tbl tr td a')[event.point.x]).attr('href');
                  if (link != undefined) {
                    window.location.href = link;
                  }
                }