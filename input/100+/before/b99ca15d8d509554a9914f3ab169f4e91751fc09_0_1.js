function(name, value) {

                if(typeof name == 'object') {

                    $.each(this, function(i, el) {

                        $.each(name, function(propName, propValue) {

                            el[propName] = propValue;

                        })

                    })

                    return this;

                } else {

                    if(typeof value == 'undefined') {

                        return this[0][name];

                    } else {

                        $.each(this, function() {

                            this[name] = value;

                        })

                        return this;

                    }

                }

            }