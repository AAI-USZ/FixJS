function(i, el) {
                if ((new RegExp(date.date().toString())).test($(el).text())) {
                    ok($(el).hasClass('selected'));
                } else {
                    ok(!$(el).hasClass('selected'));
                }
            }