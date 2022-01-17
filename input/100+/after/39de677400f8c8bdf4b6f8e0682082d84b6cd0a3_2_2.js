function (arg) {
                var j = arg.indexOf('='), o, v;

                if (j > -1) {
                    arg = arg.split('=');
                    o = arg[0];
                    v = arg[1];
                } else {
                    o = arg;
                }

                if (!schema[o] || typeof schema[o] != 'object' && o != showUse)
                    console.warn('unknown option', o, schema)
                else if (schema[o].bool)
                    ret[o] = true;
                else
                    ret[o] = v !== undef ? v : args[++i];
                if (o.length == 1 && schema[o].name)
                    ret[schema[o].name] = ret[o];
                else if (schema[o].alias)
                    ret[schema[o].alias] = ret[o];
            }