function () {
            this.$assetList.html(this.assetTemplate(this.assets));
            Utils.store('conpa-assets', this.assets);

            this.$basketPieChart.empty();
            this.$message.empty();

            App.getOptimalPortfolio();
        }