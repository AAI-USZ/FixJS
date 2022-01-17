function(){
                var q = $.trim($("#mymemberships_livefilter").val());
                if (q !== currentQuery) {
                    $.bbq.pushState({"mq": q, "mp": 1});
                    currentQuery = q;
                }
            }