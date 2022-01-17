function(val, showUnit) {
            var me = this,
                format = me.get('metadata.describe.number-format'),
                div = Number(me.get('metadata.describe.number-divisor'));
            if (format != '-') {
                var culture = Globalize.culture(me.locale), currPat = culture.numberFormat.currency.pattern.slice(0);
                if (!showUnit && format[0] == 'c') format = format == 'c0' ? 'n0': 'n2';
                if (format[0] == 'c') {
                    if (div > 0 && me.metric_prefix[div] && showUnit) {
                        var curFmt = culture.numberFormat.currency;
                        curFmt.pattern[0] = curFmt.pattern[0].replace('n', 'n'+me.metric_prefix[div]);
                        curFmt.pattern[1] = curFmt.pattern[1].replace('n', 'n'+me.metric_prefix[div]);
                    }
                    var chartCurrency = me.get('metadata.describe.number-currency').split('|');
                    culture.numberFormat.currency.symbol = chartCurrency[1];
                }
                val = Globalize.format(Number(val) / Math.pow(10, div), format);
                // reset pattern
                culture.numberFormat.currency.pattern = currPat;
                if (div > 0 && format[0] == 'n') {
                    val += me.metric_prefix[div];
                }
                if (format[0] == 'n' && showUnit) {
                    val += ' '+me.get('metadata.describe.number-unit');
                }
            }
            return val;
        }