function () {
    if (this.options.fetchFeatures) {
        this.featureProvider = komoo.providers.makeFeatureProvider();
        this.addProvider(this.featureProvider);
    }
}