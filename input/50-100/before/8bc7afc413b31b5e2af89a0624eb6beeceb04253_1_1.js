function(memo, i) {
                memo.resources.push({name: 'item ' + i});
                if (params.data.set) {
                    split = params.data.set.split(':');
                    _.last(memo.resources)[split[0]] = split[1];
                }
                return memo;
            }, {total: num, resources: []}