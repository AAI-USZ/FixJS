function () { // save the specified element
            var c = this.collection, o = arguments[0];
            if (typeof o === 'string') return c[o] ? (c[o].setData.call(c[o])?undefined:false) : false;

            for (var n in this.collection) {
                var r = this.collection[n].setData.apply(this.collection[n], arguments);
                // TODO:
                // validateAll ?
                if (!r) return r;
            }
        }