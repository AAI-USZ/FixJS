function(key, elements) {
                    var vin = elements.filter(function() {
                            return $.inArray(this, current[key]) < 0;
                        }),
                        vout = current[key].filter(function() {
                            return $.inArray(this, elements) < 0;
                        });

                    if (back) {
                        vin = $().pushStack(vin.get().reverse());
                    } else {
                        vout = $().pushStack(vout.get().reverse());
                    }

                    self._trigger('item' + key + 'in', vin);
                    self._trigger('item' + key + 'out', vout);

                    current[key].removeClass('jcarousel-item-' + key);
                    elements.addClass('jcarousel-item-' + key);

                    self['_' + key] = elements;
                }