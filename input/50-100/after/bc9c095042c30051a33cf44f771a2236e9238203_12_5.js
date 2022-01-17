function(ev) {
                var q = $.trim($('#mymemberships_livefilter').val());
                if (q !== currentQuery && ev.keyCode === 13) {
                    $.bbq.pushState({'mq': q, 'mp': 1});
                    currentQuery = q;
                }
                return false;
            }