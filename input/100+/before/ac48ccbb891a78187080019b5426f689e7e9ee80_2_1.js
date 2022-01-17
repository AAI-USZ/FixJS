function()
    {
        var retVal = {ok:null,amiName:null,amiDescription:null,noReboot:null};
        var instance = this.getSelected();
        if (instance == null) return;

        var values = this.core.promptInput('Create AMI', [{label:"Instance",type:"label",value:instance.toString()},
                                                          {label:"AMI Name",type:"name",required:1},
                                                          {label:"Description"},
                                                          {label:"Snapshot without rebooting instance",type:"checkbox"} ]);
        if (!values) return;
        this.core.api.createImage(instance.id, values[1], values[2], values[3], function(id) {
            alert("A new AMI is being created and will be available in a moment.\n\nThe AMI ID is: "+id);
        });
    }