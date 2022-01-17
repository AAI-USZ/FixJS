function(selector, data, ticks) {
        var self = this;
        self.$element = $(selector);
        self.data = data;
        self.ticks = ticks;
        self.tip_cache = {};

        self.$element.data('flot', self);

        self.resize = function(){
            self.$element.css('height', function(){
                return parseInt($(this).css('width'))/2;
            });
        };

        self.plothover = function(e, pos, item){
            if(item){
                showTooltip(pos.pageX, pos.pageY, self.get_tip_msg(item));
            }
            else{
                hideTooltip();
            }
        };

        self.get_tip_key = function(item){
            return item.datapoint[1];
        };

        self.get_tip_msg = function(item){
            var key = self.get_tip_key(item);
            if(!(key in self.tip_cache)){
                self.tip_cache[key] = '<strong>'+key+'</strong>';
            }
            return {'key':key, 'msg':self.tip_cache[key]};
        };

        // helper for returning the weekends in a period
        // copied from flot visitors example
        self.weekend_areas = function(axes) {
            var markings = [];
            var d = new Date(axes.xaxis.min);
            // go to the first Saturday
            d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
            d.setUTCSeconds(0);
            d.setUTCMinutes(0);
            d.setUTCHours(0);
            var i = d.getTime();
            do {
                // when we don't set yaxis, the rectangle automatically
                // extends to infinity upwards and downwards
                markings.push({ xaxis: { from: i, to: i + 2 * 24 * 60 * 60 * 1000 } });
                i += 7 * 24 * 60 * 60 * 1000;
            } while (i < axes.xaxis.max);

            return markings;
        };

        self.resize();

        $.plot(self.$element, [{data: self.data, color: '#049cdb'}], {
            xaxis: {
                mode: 'time',
                ticks: self.ticks,
                min: self.ticks[0],
                max: self.ticks[self.ticks.length-1]
            },
            yaxis: {
                min: 0,
                tickSize: 2,
                tickFormatter: parseInt
            },
            grid: {
                hoverable: true,
                clickable: true,
                markings: self.weekend_areas
            },
            lines: {
                show: true,
                fill: 0.4
            },
            points: {
                show: true,
                fill: true,
                radius: 4
            }
        });

        self.$element.bind({
            plothover: self.plothover,
            resize: self.resize
        });
    }