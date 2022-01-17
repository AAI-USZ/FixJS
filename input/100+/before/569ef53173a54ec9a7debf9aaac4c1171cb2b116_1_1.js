function() {
        if (!this.path.length) return;
        var me = this;
        var file = this.core.promptForFile("Upload file")
        if (file) {
            var item = this.core.queryModelS3Bucket(this.path[0])
            item.keys = []
            var f = FileIO.open(file)
            var name = this.keyName(f.leafName)
            this.core.api.uploadS3BucketFile(item.name, this.path.slice(1).join('/') + '/' + name, "", {}, file,
                    function(fn) { me.show(); },
                    function(fn, p) { me.setStatus(fn, p); });
        }
    }