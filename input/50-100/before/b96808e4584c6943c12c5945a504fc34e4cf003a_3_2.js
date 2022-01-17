function (rulesObj) {
            transformed = {};
            for (var targetPath in rulesObj) {
                var rule = rulesObj[targetPath];

                if (typeof(rule) === "string") {
                    rule = fixupExpandSpec(rule);
                }

                var expanded = expandRule(model, targetPath, rule);
                if (typeof(expanded) !== "undefined") {
                    fluid.set(transformed, targetPath, expanded);
                }
            };
            model = transformed;
        }