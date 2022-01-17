function (name, type, id, opts, required, priv, util) {
        var classes = ["field", "object-fields"], tabs, childs, order,
            panels = priv.genFields(opts.order, opts.properties, opts.required, util);

        order = priv.getKeys(opts, opts.order);
        tabs = $.map(order, function (key, index) {
            var val = opts.properties[key], label = val.title || key,
                id = panels[index].div.id;

            return {
                "li": {
                    "$childs": [{
                        "a": {
                            "href": "#" + id,
                            "$childs": label
                        }
                    }]
                }
            };
        });

        childs = [{"ul": {"$childs": tabs}}].concat(panels);

        if (required) {
            classes.push("required");
        }

        util.events.rendered.add(function () {
            var container = (typeof id === "string") ? $("#" + id) : id;

            container.tabs();
        });

        return {
            "div": {
                "id": id,
                "class": priv.ns.classes(classes),
                "$childs": childs
            }
        };
    }