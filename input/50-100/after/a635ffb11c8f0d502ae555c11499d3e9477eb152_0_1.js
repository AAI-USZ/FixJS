function(options) {

            if (this instanceof jQuery) {

                if(!options) options = {};



                if(this.get().length > 0) {

                    $.extend(true, options,  { elements: this.get() });

                }

            }

            regula.bind(options);

            return this; //make chainable

        }