function(i, el) {
                if ((new RegExp('^' + date.date().toString() + '$')).test($(el).text().trim())) {
                    ok($(el).hasClass('selected'), [
                        'expected el to be selected,' +
                        'date: ', date.format('YYYY-MM-DD'), ', ' + 
                        'el.class:' + el.className + ', ' + 
                        'text: ' + $(el).text()].join());
                } else {
                    ok(!$(el).hasClass('selected'), [
                        'expected el NOT to be selected,' +
                        'date: ', date.format('YYYY-MM-DD'), ', ' + 
                        'el.class:' + el.className + ', ' + 
                        'text: ' + $(el).text()].join());
                }
            }