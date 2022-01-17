function (arg, name) {
        var i = 0, l = arg.length, key;
        !schema[name] && (schema[name] = {});
        for (; i < l; i++) {
            if (name && arg[i] == 'required') {
                schema[name].required = true;
            } else if (arg[i] !== undef) {
                key = typeof arg[i] === 'boolean' ? ((bools.push(name)), 'bool') : (arg[i].length == 1 ? 'alias' : 'description');
                schema[name][key] = arg[i];
                key == 'alias' && (schema[arg[i]] = schema[name]);
            }
        }
    }