function() {
        var me = this;
        var item = this.getSelected()
        if (item == null) return
        var retVal = { ok : null, content: null };

        function wrap() {
            window.openDialog("chrome://ew/content/dialogs/manage_s3acl.xul", null, "chrome,centerscreen,modal,resizable", me.core, retVal, item);
            if (retVal.ok) {
                if (item.bucket) {
                    me.core.api.setS3BucketKeyAcl(item.bucket, item.name, retVal.content, function() { me.selectionChanged(); })
                } else {
                    me.core.api.setS3BucketAcl(item.name, retVal.content, function() { me.selectionChanged(); })
                }
            }
        }

        if (!this.path.length) {
            this.core.api.getS3BucketAcl(item.name, wrap)
        } else {
            this.core.api.getS3BucketKeyAcl(item.bucket, item.name, wrap)
        }
    }