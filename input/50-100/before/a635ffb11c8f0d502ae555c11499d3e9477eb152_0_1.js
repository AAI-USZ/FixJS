function(options) {

            if (this instanceof jQuery) {

                if(!options) options = {};

                $.extend(true, options,  { elements: this.get() });

            }

            regula.bind(options);

            return this; //make chainable

        }