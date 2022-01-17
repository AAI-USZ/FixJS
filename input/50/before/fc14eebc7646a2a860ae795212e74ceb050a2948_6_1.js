function() {
            var customizationSet = customizations();
            return customizationSet.apply(customizationSet.toPath(this.customizationSet, 'components', this.id), this.inherited(arguments));
        }