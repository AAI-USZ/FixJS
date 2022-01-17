function() {
            return this.tools || (this.tools = {
                tbar: [{
                    id: 'configure',
                    action: 'navigateToConfigurationView'
                }]
            });
        }