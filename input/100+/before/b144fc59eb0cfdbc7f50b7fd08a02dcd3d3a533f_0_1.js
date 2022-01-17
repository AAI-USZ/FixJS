function (env, args) {
        var frame = new(tree.Ruleset)(null, []), varargs, arg;

        for (var i = 0, val, name; i < this.params.length; i++) {
            arg = args && args[i]

            if (arg && arg.name) {
                frame.rules.unshift(new(tree.Rule)(arg.name, arg.value.eval(env)));
                args.splice(i, 1);
                i--;
                continue;
            }
			
            if (name = this.params[i].name) {
                if (this.params[i].variadic && args) {
                    varargs = [];
                    for (var j = i; j < args.length; j++) {
                        varargs.push(args[j].eval(env));
                    }
                    frame.rules.unshift(new(tree.Rule)(name, new(tree.Expression)(varargs).eval(env)));
                } else if (val = (arg && arg.value) || this.params[i].value) {
                    frame.rules.unshift(new(tree.Rule)(name, val.eval(env)));
                } else {
                    throw { type: 'Runtime', message: "wrong number of arguments for " + this.name +
                            ' (' + args.length + ' for ' + this.arity + ')' };
                }
            }
        }
        return frame;
    }