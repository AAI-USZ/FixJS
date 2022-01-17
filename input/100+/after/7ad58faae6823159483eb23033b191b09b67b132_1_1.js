function () {
            var list;

            this.assets = Utils.store('conpa-assets');

            this.assetTemplate = Handlebars
                    .compile($('#asset-template').html());
            list = this.$assetList = $('#asset-list');
            list.on('click', '.destroy', this.destroy);

            this.$newAsset = $('#new-asset');
            this.$newAsset.on('selectitem', this.create);

            this.assetStatsTemplate = Handlebars
                    .compile($('#asset-stats-template').html());
            this.$assetStatsName = $('#asset-stats-name');
            this.$assetStatsList1 = $('#asset-stats-list1');
            this.$assetStatsList2 = $('#asset-stats-list2');

            this.latestPortfoliosTemplate = Handlebars
                    .compile($('#latest-portfolios-template').html());
            this.$latestPortfoliosList = $('#latest-portfolios-list');

            this.otherPortfoliosTemplate = Handlebars
                    .compile($('#other-portfolios-template').html());
            this.$bestPerfomingPortfoliosList = $('#best-performing-portfolios-list');

            this.$basketPieChart = $('#basket-pie-chart');
            this.$basketPieYTDChart = $('#basket-pie-ytd-chart');
            this.$basketPerfYTDChart = $('#basket-performance-ytd-chart');
        }