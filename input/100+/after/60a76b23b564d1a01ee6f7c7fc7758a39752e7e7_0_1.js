function(v) {
        var d = v;
        if (Ext.isNumber(parseFloat(v))) {
            d = new Date(parseFloat(v)*1000);
        }
        var str = this.formatDate(d);
        if (str) {
            var bcYear = str.match(this.bcYrRegEx);
            if (bcYear) {
                bcYear = bcYear[0] || bcYear[1];
                if (bcYear && bcYear.length < 5) {
                    var zeropad = '-';
                    for (var i=bcYear.length;i<=4; ++i) {
                        zeropad += '0';
                    }
                    str = str.replace(bcYear, zeropad + Math.abs(parseInt(bcYear, 10)));
                }
            }
        }
        return Ext.form.DateField.superclass.setValue.call(this, str);
    }