function (options) {
            log('observationFormLayoutView:initialize');
            this.categories = options.categories;
            this.model.mediaResources.on('change:Metadata', this.onMediaResourceFilesChanged, this);
        }