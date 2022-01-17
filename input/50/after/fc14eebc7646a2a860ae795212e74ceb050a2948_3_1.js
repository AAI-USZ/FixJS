function() {
            return this.tools || (this.tools = {
                'top': [{
                    id: 'new',
                    action: 'navigateToInsertView',
                    security: App.getViewSecurity(this.insertView, 'insert')
                }]
            });
        }