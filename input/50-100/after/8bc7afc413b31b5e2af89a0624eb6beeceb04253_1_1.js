function(memo, i) {
                memo.resources.push({name: 'item ' + i});
                if (num < 10) {
                    _.last(memo.resources).foo = 'bar';
                }
                return memo;
            }, {total: num, resources: []}