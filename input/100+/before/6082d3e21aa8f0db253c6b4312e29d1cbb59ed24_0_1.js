function applyRules(oldValue, rules, cb) {
            if (rules.length > 0) {
              rule = parseRule(rules[0]);

              try {
                ruleFn = config.rules[rule.name](paramDef.name, rule.arg);
                ruleFn(oldValue, function(err, newValue) {
                  if (err) throw err;
                  applyRules(newValue, rules.slice(1), cb);
                })
              } catch(e) {
                e.parameterName = paramDef.name;
                cb(null, [e, paramDef.name, oldValue]);
              }
            } else {
              cb(null, [null, paramDef.name, oldValue]);
            }
          }