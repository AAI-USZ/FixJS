function() {
            this.originalCallback = this.configuration.callback;
            this.wrappedCallback = this.getCallbackWrapper();
            this.wrappedConfiguration = $.extend(true, {}, this.configuration);

            this.rootNode = this.$element.get(0);
            this.wrappedConfiguration.callback = this.wrappedCallback;

            this.observer = new MutationSummary(this.wrappedConfiguration);
        }