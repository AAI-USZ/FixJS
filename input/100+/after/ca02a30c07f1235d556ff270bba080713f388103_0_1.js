function (i, key) {
            var
                value,
                schema = opts.properties[key],
                required = $.inArray(key, schema.required) !== -1,
                selector = "." + priv.genFieldClasses(key, schema, ".", required),
                field = cont.children(selector);

            if (field.size() !== 1) {
                defaults.displayWarning("expected one item collecting",
                    field.size(), key, selector, cont, field);

                value = priv.collectResult(false,
                    "expected one item collecting", {
                        key: key,
                        size: field.size()
                    });

            } else {
                value = priv.collectField(key, field, schema);
            }

            if (!value.result.ok) {
                result.ok = false;
                result.msg = "one or more errors in object fields";
                result.data[key] = value.result;
            }

            data[key] = value.data;
        }