function()
    {
        var me = this;
        var item = this.getSelected();
        if (!item) return;
        var values = this.core.promptInput('Add Policy', [{label:"Policy name",type:"name",required:1},
                                                          {label:"Policy Permissions",multiline:true,cols:50,rows:20,required:1,value:'{\n "Statement": [\n  { "Effect": "Allow",\n    "Action": "*",\n    "Resource": "*"\n  }\n ]\n}'}]);
        if (!values) return;
        this.core.api.putUserPolicy(item.name, values[0], values[1], function() {
            item.policies = null;
            me.selectionChanged();
        });
    }