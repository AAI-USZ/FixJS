function() {
            var rawElement = this.$element.get(0);

            this.originalCallback = this.configuration.callback;
            this.wrappedCallback = this.getCallbackWrapper();
            this.wrappedConfiguration = $.extend(true, {}, this.configuration);

            if (this.$element.length === 1) {
                // mutation-summary fails if passing global
                if (rawElement !== global) {
                    this.wrappedConfiguration.rootNode = rawElement;
                }
            }

            this.wrappedConfiguration.callback = this.wrappedCallback;

            this.observer = new MutationSummary(this.wrappedConfiguration);
        }