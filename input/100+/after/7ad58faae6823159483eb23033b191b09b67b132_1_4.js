function () {
            var today = new Date(),
                yearToDate = new Date(today - (1000 * 60 * 60 * 24 * 365)),
                lastAsset;

            this.$assetList.html(this.assetTemplate(this.assets));
            Utils.store('conpa-assets', this.assets);

            this.$basketPieChart.empty();
            this.$basketPieYTDChart.empty();
            this.$basketPerfYTDChart.empty();
            $.publish('clear.message.conpa');


            if (this.assets.length) {
                lastAsset = this.assets[this.assets.length - 1].symbol;
                App.getKeyStatistics(lastAsset);

            }

            App.getOptimalPortfolio(App.$basketPieChart,
                null,
                today.toString());
            App.getOptimalPortfolio(App.$basketPieYTDChart,
                App.$basketPerfYTDChart,
                yearToDate.toString());
        }