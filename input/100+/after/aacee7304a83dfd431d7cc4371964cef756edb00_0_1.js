function (xml) {
            var json = {},
                self = this,
                jqEl,
                val;

            $(xml).children().each(function (idx, el) {
                jqEl = $(el);
                if (jqEl.children().length === 0) {
                    val = jqEl.text();
                    if ($.isNumeric(val)) {
                        val = Number(val);
                    }
                    json[el.nodeName.toLowerCase()] = val;
                } else {
                    json[el.nodeName.toLowerCase()] = self._AtomToJson(el);
                }
            });
            return json;
        }