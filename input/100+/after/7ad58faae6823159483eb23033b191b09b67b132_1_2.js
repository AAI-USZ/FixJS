function (data) {
                    if (data.message) {
                        $.publish('error.message.conpa',
                            ['Optimization error', data.message]);

                        return;
                    }

                    pieNode.sparkline(data.optim.solution, {
                        type: 'pie',
                        height: '150',
                        offset: 90,
                        tooltipFormatter: function (spark, options, field) {
                            var index;

                            $.grep(data.optim.solution, function (n, i) {
                                if (n === field.value) {
                                    index = i;
                                }
                            });

                            return assets[index] + " " +
                                Helpers.percentageFormatter(field.value);
                        }
                    });

                    if (data.perf.length) {
                        perfNode.sparkline(data.perf, {
                            type: 'bar',
                            height: '150',
                            tooltipFormatter: function (spark, options, field) {
                                return Helpers.percentageFormatter(field[0].value);
                            }
                        });
                    }
                }