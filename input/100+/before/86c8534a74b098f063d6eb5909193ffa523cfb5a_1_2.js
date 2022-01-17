function()
    {
        var me = this;
        var item = this.getSelected();
        if (!item) return;
        var name = prompt("Enter new policy name");
        if (!name) return;
        var text = '{\n "Statement": [\n  { "Effect": "Allow",\n    "Action": "*",\n    "Resource": "*"\n  }\n ]\n}';
        text = this.core.promptForText('Enter policy permissions',text);
        if (text) {
            this.core.api.putGroupPolicy(item.name, name, text, function() {
                item.policies = null;
                me.selectionChanged();
            });
        }
    }