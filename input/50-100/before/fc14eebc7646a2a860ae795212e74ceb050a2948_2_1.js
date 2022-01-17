function() {
            return this.tools || (this.tools = {
                'tbar': [{
                    id: 'save',
                    action: 'save',
                    security: this.options && this.options.insert
                        ? this.insertSecurity
                        : this.updateSecurity
                },{
                    id: 'cancel',
                    side: 'left',
                    publish: '/app/scene/back'
                }]
            });
        }