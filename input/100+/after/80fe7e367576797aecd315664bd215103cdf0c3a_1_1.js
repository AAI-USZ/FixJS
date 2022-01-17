function(xml) {
                        window.r = $(xml)
                        /* Preprocess - Fix all buggy dates */
                        var startTimes = Array.prototype.slice.call(xml.getElementsByTagNameNS("*", "start"));
                        var endTimes = Array.prototype.slice.call(xml.getElementsByTagNameNS("*", "end"));
                        var allTimes = [].concat(startTimes, endTimes);
                        _(allTimes).each(function (el) {
                            el.textContent = el.textContent.replace(/ ([0-9][0-9]:[0-9][0-9]:[0-9][0-9])/, 'T$1');
                        });                           
                        var dbload = $.rdf().load(xml, {});
                        var json = dbload.databank.dump();
                        var json_ms = _(json).keys().map(function(k) {
                            var m = get_model(k, this_.model);
                            _(m.attributes).chain()
                               .extend({_id:k})
                               .extend(this_._convert_values(json[k]));
                            return m;
                        });
                        this_.reset(json_ms);
                        d.resolve(this_);
                    }