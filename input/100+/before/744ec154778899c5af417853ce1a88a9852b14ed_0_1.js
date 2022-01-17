function () {
                    var elements = [], e, c, args = [], arg, index = i, s = input.charAt(i), name, value, important = false;

                    if (s !== '.' && s !== '#') { return }

                    while (e = $(/^[#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/)) {
                        elements.push(new(tree.Element)(c, e, i));
                        c = $('>');
                    }
                    if ($('(')) {
                        while (arg = $(this.expression)) {
                            value = arg;
                            name = null;

                            // Variable
                            if (arg.value.length = 1) {
                                var val = arg.value[0];
                                if (val instanceof tree.Variable) {
                                    if ($(':')) {
                                        if (value = $(this.expression)) {
                                            name = val.name;
                                        } else {
                                            throw new(Error)("Expected value");
                                        }
                                    }
                                }
                            }

                            args.push({ name: name, value: value });

                            if (! $(',')) { break }
                        }
                        if (! $(')')) throw new(Error)("Expected )");
                    }

                    if ($(this.important)) {
                        important = true;
                    }

                    if (elements.length > 0 && ($(';') || peek('}'))) {
                        return new(tree.mixin.Call)(elements, args, index, env.filename, important);
                    }                },
