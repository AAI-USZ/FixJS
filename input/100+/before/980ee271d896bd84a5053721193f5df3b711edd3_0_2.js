function(e, ev){
                    if (panned || wheeled) return;
                    var
                      $target= $(ev.target),
                      href= ($target.is('a') ? $target : $target.parents('a')).attr('href')
                    href && (panned= !!(window.location.href= href))
                  }