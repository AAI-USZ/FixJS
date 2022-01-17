function()
    {
        var color;
        var that = this;
        var items = that[$.bbq.getState('type')];

        var formula = $('#formula').val(),
            formula_min = $('#formula_min').val() + ';',
            formula_norma = $('#formula_norma').val() + ';',
            formula_max = $('#formula_max').val() + ';';

        for (var i in items)
        {
            var polygon = items[i];
            var metric = polygon.getProperty(that.currentMetric);
            if (metric != undefined && formula != '')
            {
                with (this)
                {
                    extract(polygon.getProperties());
                    var V = eval(formula);
                    var a = eval(formula_min);
                    var b = eval(formula_norma);
                    var c = eval(formula_max);
                }

                if (V == Infinity || a == Infinity || b == Infinity || c == Infinity ||
                    V == undefined || a == undefined || b == undefined || c == undefined)
                {
                    n = undefined;
                    color = this._hexFromRGB(0, 0, 0);
                }
                else
                {
                    // transfer a to zero
                    V -= a;
                    c -= a;
                    b -= a;
                    a -= a;

                    if (V > b)
                    {
                        // transfer b to zero
                        V -= b
                        c -= b;
                        b -= b;

                        n = 100 + 100 * V / c;
                    }
                    else
                    {
                        n = 100 * V / b;
                    }

                    polygon.bubbleText = Math.ceil(n);
                    n -= 100;
                    n = (n > 100) ? 100 : (n < -100 ? -100 : n);

                    if (n < 0)
                    {
                        color = this._hexFromRGB((255 * (-n)) / 100, (255 * (100 - (-n))) / 100, 0);
                    }
                    else
                    {
                        color = this._hexFromRGB(0, (255 * (100 - n)) / 100, (255 * n) / 100);
                    }
                }
            }
            else
            {
                color = this._hexFromRGB(0, 0, 0);
            }

            polygon.setColor(color);
        }
    }