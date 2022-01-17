function(e, ev){
                    if (panned || wheeled) return;
                    var
                      $target= $(ev.target),
                      $link= ($target.is('a') ? $target : $target.parents('a')),
                      href= $link.attr('href'),
                      target= $link.attr('target') || 'self'
                    if (!href) return;
                    if (target == '_blank') panned= !!window.open(href)
                    else panned= !!(window[target].location.href= href)
                  }