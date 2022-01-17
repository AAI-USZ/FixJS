function (data, grouped) {
            // see if the scale is to be set automatically
            if (!this.opts.yscale.auto && !r.is(this.opts.yscale.scale, "number")) {
                // calculate scale automatically from min and max vals
                var diff = (this.opts.yscale.max+this.opts.yscale.top_gutter) - 
                    this.opts.yscale.min,
                    y_height = this.ds.bottom - this.ds.top,
                    y_scale = y_height / diff;
                this.opts.yscale.scale = y_scale;
                return this.opts.yscale;
            }

            var min = 0, max = -1;
            if (!grouped) {
                //min = Math.min.apply(null, data);
                for (var i = 0; i < data.length; i++) {
                    var n;
                    if (r.is(data[i], "number")) {
                        n = data[i];
                    } else {
                        n = data[i].val;
                    }
                    if (n > max) {
                        max = n;
                    }
                }
            } else {
                var max = -1;
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j++) {
                        var data_obj = this.get_data_point(data[i]);
                        max = data_obj > max ? data_obj : max;
                    }
                }
            }

            // check if new scale not required
            if (!r.is(this.opts.yscale, "undefined")) {
                if ((max < this.opts.yscale.max) &&
                    (max > (this.opts.yscale.max - this.opts.yscale.top_gutter))
                   ) {
                    return this.opts.yscale;
                }
            }

            var diff = (max+this.opts.yscale.top_gutter) - min,
                y_height = this.ds.bottom - this.ds.top,
                y_scale = y_height / diff;

            return {
                scale: y_scale,
                min: min,
                max: (max+this.opts.yscale.top_gutter)
            };
        }