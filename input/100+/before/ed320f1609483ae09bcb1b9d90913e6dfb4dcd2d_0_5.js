function () {
        var color;
        var that = this;
        var items = that[$.bbq.getState('type')];
        for (var i in items) {
            var polygon = items[i];
            var metric = polygon.getProperty(that.currentMetric);
            var density = polygon.density;
            if (metric != undefined && $('#formula').val() != '') {
                with (this) {
                    extract(polygon.getProperties());
                    n = eval($('#formula').val());
                }
                polygon.bubbleText = Math.ceil(n) + '%';

                n -= 100;
                if (n < -100) {
                    n = -100;
                } else if (n > 100) {
                    n = 100;
                }

                if (n < 0)
                    color = this._hexFromRGB((255 * (-n)) / 100, (255 * (100 - (-n))) / 100, 0);
                else
                    color = this._hexFromRGB(0, (255 * (100 - n)) / 100, (255 * n) / 100);

            } else {
                color = this._hexFromRGB(0, 0, 0);
            }

            polygon.setColor(color);
        }
    }