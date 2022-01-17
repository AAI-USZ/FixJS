function()
    {
        var me = this;
        var item = this.getSelected();
        if (!item) return;
        var values = this.core.promptInput('Add Policy', [{label:"Policy name",type:"name",required:1},
                                                          {label:"Policy Permissions",multiline:true,cols:50,rows:20,required:1},
                                                          {label:"Policy Types",type:"menulist",list:this.core.getPolicyTypes(),required:1,onselect:"rc.items[1].obj.value=formatJSON(rc.items[2].obj.value)"}]);
        if (!values) return;
        this.core.api.putGroupPolicy(item.name, values[0], values[1], function() {
            item.policies = null;
            me.invalidate();
        });
    }