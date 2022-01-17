function() {
            return this.tools || (this.tools = {
                top: [{
                    id: 'configure',
                    action: 'navigateToConfigurationView'
                }]
            });
        }