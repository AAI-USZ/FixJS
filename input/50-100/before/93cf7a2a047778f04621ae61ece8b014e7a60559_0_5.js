function () {
                var when = new Array();
                var from  = graph.find("#from").text();
                if (from) {
                    when.push('from=' + from);
                }
                var until = graph.find("#until").text();
                if (until) {
                    when.push('until=' + until);
                }
                return when
            }