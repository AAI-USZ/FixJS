function () {
            this.$assetList.html(this.assetTemplate(this.assets));
            Utils.store('conpa-assets', this.assets);

            App.getOptimalPortfolio();
        }