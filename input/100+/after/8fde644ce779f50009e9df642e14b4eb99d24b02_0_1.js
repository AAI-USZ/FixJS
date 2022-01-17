function () {
                var e, p, nodes = [];

                do {
                    if (e = $(this.entities.keyword)) {
                        nodes.push(e);
                    } else if ($('(')) {
                        p = $(this.property);
                        e = $(this.entity);
                        if ($(')')) {
                            if (p && e) {
                                nodes.push(new(tree.Paren)(new(tree.Rule)(p, e, null, i, true)));
                            } else if (e) {
                                nodes.push(new(tree.Paren)(e));
                            } else {
                                return null;
                            }
                        } else { return null }
                    }
                } while (e);

                if (nodes.length > 0) {
                    return new(tree.Expression)(nodes);
                }
            }