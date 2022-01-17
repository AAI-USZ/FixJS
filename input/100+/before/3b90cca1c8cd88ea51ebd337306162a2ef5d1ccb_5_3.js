function() {
            var chart = new Chart(this.chartNode, this.chartOptions);
            this.chart = chart;

            chart.setTheme(this.getTheme());
            chart.addPlot('default', this.getType());

            var axes = this.getAxes();
            if (!lang.isArray(axes))
                axes = [axes];
            array.forEach(axes, function(axis){
                this.addAxis(axis['axis'], axis['options'] || {});
            }, chart);

            this.setAxisLabelSizes();

            var data = this.getSeries(this.feed);
            if (!lang.isArray(data))
                data = [data];
            array.forEach(data, function(series){
                this.addSeries(series['name'], series['data'], series['options'] || {});
            }, chart);

            if (this.grid)
                chart.addPlot("Grid", lang.mixin(this.grid, {type: "Grid"}));

          //  if (this.click || this.mouseover || this.mouseout)
            chart.connectToPlot('default', this, this.onChartEvent);

            chart.render();

            if (this.legend)
                new Legend(lang.mixin({},{chart: chart}, this.legendOptions), this.legendNode);

        }