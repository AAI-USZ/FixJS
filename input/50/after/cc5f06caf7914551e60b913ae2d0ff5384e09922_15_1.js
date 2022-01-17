function (options) {
            this.categories = options.categories;
            this.model.mediaResources.on('change:Metadata', this.onMediaResourceFilesChanged, this);
        }