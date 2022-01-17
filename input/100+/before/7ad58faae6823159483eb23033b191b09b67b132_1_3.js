function (pieNode, perfNode, refDate) {
            var self = this,
                lows = [],
                highs = [],
                assets = $.map(this.assets, function (asset, i) {
                    lows[i] = 0;
                    highs[i] = -1;

                    return asset.symbol;
                });

            if (assets.length < 3) {
                return;
            }

            refDate = refDate || (new Date()).toString();

            $.ajax({
                url: "/ConPA/getOptimalPortfolio",
                type: "POST",
                data: {
                    prods: assets,
                    referenceDate: refDate,
                    targetReturn: undefined,
                    lows: lows,
                    highs: highs
                },
                success: function (data) {
                    if (data.message) {
                        self.$message.html(self.messageTemplate({
                            type: 'alert-error',
                            heading: 'Optimization error',
                            message: data.message
                        }));

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
            });
        }