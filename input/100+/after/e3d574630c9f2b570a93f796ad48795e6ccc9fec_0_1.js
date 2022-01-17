function(m) {
        console.log('Parent got message ' + JSON.stringify(m));
        if(m.resolve) {
            var pairs = [];
            for(var name in m.resolve) {
                var value = eval(m.resolve[name]);
                pairs.push({
                    'name': m.resolve[name],
                    'value': value.toString()
                });
            }
            worker.send({'vars': pairs});
        } else if(m.callback) {
            callback(m.value);
        }
    }