function() {
            this._tmpl = this.opts.tmpl;
            var el = null;
            if (typeof this._tmpl == 'function')
                el = $(this._tmpl());
            else if (this._tmpl.tagName) {
                //dom element
                el = $(this._tmpl);
            } else if (this._tmpl.css) {
                //jquery object
                if (this._tmpl.length > 0)
                    el = $($(this._tmpl[0]).html());
                else
                    throw "Empty jquery object received";
            } else if (typeof this._tmpl == 'string') {
                //path
                el = $($(this._tmpl).html());
                if (el.length == 0) {
                    throw "Empty jquery path received:"+this._tmpl;
                }
            } else 
                throw "Invalid template argument provided:"+this._tmpl;

            if (this._elm) {
                this._elm.html(el.html());
                this._elm.unbind('click,keydown,keyup,mouseover,mousedown');
            } else {
                this._elm = el;
                if (this.opts["class"]) {
                    el.addClass(this.opts["class"]);
                }
            }

            if (this.opts.target) {
                this._target = this._elm.find(this.opts.target);
            } else {
                this._target = this._elm;
            }
            
            this._elm.widget(this);
            if (this.opts.height)
                this._elm.outerHeight(this.opts.height);
            if (this.opts.width)
                this._elm.outerWidth(this.opts.width);
                
            this.trigger('after-element');
        }