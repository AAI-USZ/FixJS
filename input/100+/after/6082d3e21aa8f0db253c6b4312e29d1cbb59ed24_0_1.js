function applyRules(oldValue, rules, cb) {
            if (rules.length > 0) {
              rule = parseRule(rules[0]);

              ruleFn = config.rules[rule.name](paramDef.name, rule.arg);
              ruleFn(oldValue, function(err, newValue) {
                if (err) {
                  err.parameterName = paramDef.name;
                  cb(null, [err, paramDef.name, oldValue]);
                } else {
                  applyRules(newValue, rules.slice(1), cb);
                }
              });
            } else {
              cb(null, [null, paramDef.name, oldValue]);
            }
          }