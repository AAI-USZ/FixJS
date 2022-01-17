function (data) {
                    if (data.message) {
                        self.$message.html(self.messageTemplate({
                            type: 'alert-error',
                            heading: 'Optimization error',
                            message: data.message
                        }));

                        return;
                    }

                    self.$basketPieChart.sparkline(data.optim.solution, {
                        type: 'pie',
                        width: '150',
                        height: '150',
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
                }