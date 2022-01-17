function() {
                var errors = {};

                for (var idx in this._attributes) {
                    var attr = this._attributes[idx],
                        key = idx,
                        value = this._attribute[idx],
                        type = this._attributes[idx].type;
                    if (attr.required && !value) {
                        errors[idx] = {
                            "message": "обязательный параметр",
                            "input": value
                        }
                        continue;
                    }
                    if (value) {
                        var rawString = Object.prototype.toString.call(value).slice(8, -1);

                        if (!type) {
                            debugger;
                            throw new Error("Incorrect Type");
                        }
                        if (type == "enum") {
                            var variants = this._attributes[idx]["variants"];
                            if (variants.indexOf(value) === -1) {
                                errors[idx] = {
                                    "message": "значение, не принадлежащее списку возможных значений",
                                    "input": value
                                };
                            };
                            continue;
                        };
                        if (type == "list") {
                            // Java-like List (array of objects)
                            var objectClass = this._attributes[idx]["objectClass"];
                            var arr = value.map(function(item) {
                                if (item instanceof objectClass && item.isValid()) {
                                    return item;
                                } else {
                                    errors[idx] = {
                                        "message": "некорректный элемент списка",
                                        "input": value
                                    };
                                }
                            })
                            continue;
                        };
                        if (typeof type === "object" || typeof type === "function") {
                            if (!value instanceof type) {
                                errors[idx] = {
                                    "message": "неверный класс",
                                    "input": type
                                };
                            }
                        } else {
                            if (rawString !== type) {
                                errors[idx] = {
                                    "message": "неверный тип",
                                    "input": type
                                };
                            }
                        };
                        if (attr.pattern) {
                            if (!attr.pattern.test(value)) {
                                errors[idx] = {
                                    "message": "неверное значение",
                                    "input": value
                                };
                            }
                        };
                    };
                }
                this._lastValidationErrors = errors;
            }