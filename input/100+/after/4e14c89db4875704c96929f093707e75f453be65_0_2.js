function(e) {
                var thisObj = e.data.thisObj,
                    o = {};

                o._this = e.target;
                o.$this = $(o._this);
                o.data = o.$this.data('mask');

                if (o.$this.attr('readonly') || !o.data) {
                    return true;
                }

                o[o.data.type] = true;
                o.value = o.$this.val();
                o.nKey = thisObj.__getKeyNumber(e);
                o.range = thisObj.__getRange(o._this);
                o.valueArray = o.value.split('');
                return e.data.func.call(thisObj, e, o);
            }