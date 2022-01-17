function(feed) {
            var values = [];
            for (var i = 0; i < feed.length; i++)
            {
                var o = feed[i],
                    description = (this.seriesLabelFormatter) ? this.seriesLabelFormatter(o[this.descriptionProperty]) : o[this.descriptionProperty],
                    value = o[this.valueProperty];

                if ((value[0] || value) > this.stats.max)
                    this.stats.max = value[0] || value;
                if ((value[0] || value) < this.stats.min)
                    this.stats.min = value[0] || value;

                if (description)
                    values.push({
                        x: this.valueAxis === 'x' ? (value[0] || value) : i+1,
                        y: this.valueAxis === 'y' ? (value[0] ||value) : i+1,
                        text: description[0] || description,
                        legend: string.substitute(this.legendLabelTemplate,[description, value])
                    });
            }

            return {name: 'series1', data: values};
        }