function(list)
    {
        var idx = -1;
        var path = this.path.join("/") + "/";
        var nlist = [];
        for (var i in list) {
            if (list[i].name.match('log')) continue;
            var n = (this.path[0] + "/" + list[i].name).replace(/[ \/]+$/, '');
            var p = n.split("/");
            //debug(path + ":" + n + ":" + p.length + ":" + this.path.length);
            // Next level only
            if (!this.path.length || n.indexOf(path) == 0 && p.length == this.path.length + 1) {
                list[i].folder = p[p.length - 1];
                list[i].label = list[i].folder + (list[i].name[list[i].name.length - 1] == "/" ? "/" : "")
                nlist.push(list[i])
                // Select given item
                if (list[i].name == this.folder) {
                    idx = nlist.length - 1;
                }
            }
        }
        TreeView.display.call(this, nlist);
        if (idx >= 0) this.setSelected(idx);
        $("ew.s3Buckets.path").value = path;
        this.folder = '';
    }