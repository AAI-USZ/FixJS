function (xml) {
            var json = {},
                self = this,
                jqEl;

            $(xml).children().each(function (idx, el) {
                jqEl = $(el);
                if (jqEl.children().length === 0) {
                    json[el.nodeName] = jqEl.text();
                } else {
                    json[el.nodeName] = self._AtomToJson(el);
                }
            });
            return json;
        }