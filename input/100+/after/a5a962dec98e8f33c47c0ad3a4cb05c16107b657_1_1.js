function() {
        var me = this;
        var item = this.getSelected()
        if (item == null) return
        var name = !this.path.length ? item.name : item.bucket;
        var policy = this.core.api.getS3BucketPolicy(name);
        var values = me.core.promptInput('Bucket Policy', [ {label:"Bucket",type:"label",value:name},
                                                            {label:"Policy",value:policy || "",multiline:true,rows:15,cols:60}]);
        if (!values) return;
        this.core.api.setS3BucketPolicy(item.name, values[1]);
    }