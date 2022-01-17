function(doc) {
            var text = me.core.promptForText('Enter policy permissions', doc);
            if (text) {
                me.core.api.putGroupPolicy(item.name, item.policies[idx], text);
            }
        }