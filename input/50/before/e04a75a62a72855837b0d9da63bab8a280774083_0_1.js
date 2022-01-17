function(doc) {
            var text = me.core.promptForText('Enter policy permissions', doc);
            if (text) {
                this.core.api.putUserPolicy(item.name, item.policies[idx], text);
            }
        }