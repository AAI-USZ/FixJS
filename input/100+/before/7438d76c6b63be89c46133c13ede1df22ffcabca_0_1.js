function () {
                var e, t, c, v;

                c = $(this.combinator);
                e = $(/^(?:\d+\.\d+|\d+)%/) || $(/^(?:[.#]?|:*)(?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/) ||
                    $('*') || $(this.attribute) || $(/^\([^)@]+\)/);

                if (! e) {
                    $('(') && (v = $(this.entities.variable)) && $(')') && (e = new(tree.Paren)(v));
                }

                if (e) { return new(tree.Element)(c, e, i) }

                if (c.value && c.value.charAt(0) === '&') {
                    return new(tree.Element)(c, null, i);
                }
            }