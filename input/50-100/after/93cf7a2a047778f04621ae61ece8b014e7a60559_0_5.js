function () {
                var when = new Array();
                var from  = wrap.find(id('from', graph)).text();
                if (from) {
                    when.push('from=' + from);
                }
                var until = wrap.find(id('until', graph)).text();
                if (until) {
                    when.push('until=' + until);
                }
                return when
            }