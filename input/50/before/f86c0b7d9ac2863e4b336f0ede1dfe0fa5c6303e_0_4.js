function(type, fn) {

                $.each(this, function() {

                    this.addEventListener(type, fn, false);

                })

                return this;

            }