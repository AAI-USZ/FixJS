function (idx, el) {
                jqEl = $(el);
                if (jqEl.children().length === 0) {
                    json[el.nodeName] = jqEl.text();
                } else {
                    json[el.nodeName] = self._AtomToJson(el);
                }
            }