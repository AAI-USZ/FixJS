function(list)
    {
        var idx = -1;
        var path = this.path.join("/") + "/";
        var nlist = [];
        var labels = {};
        for (var i in list) {
            if (!this.path.length) {
                list[i].folder = list[i].label = list[i].name;
                nlist.push(list[i]);
            } else {
                var n = this.path[0] + "/" + list[i].name;
                var p = n.split("/");
                if (n <= path || n.indexOf(path) != 0) continue;
                list[i].folder = list[i].label = p.slice(this.path.length, this.path.length + 1).join("/");
                if (p.length > this.path.length + 1) list[i].label += "/";
                // Skip subfolders
                if (labels[list[i].label]) continue;
                labels[list[i].label] = 1;
                nlist.push(list[i]);
            }
            // Select given item
            if (list[i].label == this.folder) {
                idx = nlist.length - 1;
            }
        }
        TreeView.display.call(this, nlist);
        if (idx >= 0) this.setSelected(idx);
        $("ew.s3Buckets.path").value = path;
        this.folder = '';
    }