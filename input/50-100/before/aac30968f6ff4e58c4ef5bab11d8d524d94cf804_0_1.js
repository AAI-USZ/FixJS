function (arg1, arg2, option) {
            var entity = this;
            if (typeof arg1 === "string" && arg2) {
                // calling entity.setOrAdd("rdfs:type", "example:Musician")
                entity._setOrAddOne(arg1, arg2, option);
            }
            else if (typeof arg1 === "object") {
                // calling entity.setOrAdd({"rdfs:type": "example:Musician", ...})
                _(arg1).each(function (val, key) {
                    entity._setOrAddOne(key, val, arg2);
                });
            }
            return this;
        }