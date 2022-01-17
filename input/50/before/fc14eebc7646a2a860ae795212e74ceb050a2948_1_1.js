function() {
            return this.tools || (this.tools = {
                'tbar': [{
                    id: 'edit',
                    action: 'navigateToEditView',
                    security: App.getViewSecurity(this.editView, 'update')
                }]
            });
        }