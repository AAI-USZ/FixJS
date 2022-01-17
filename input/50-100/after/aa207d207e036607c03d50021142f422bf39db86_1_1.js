function() {
        var ret = true;
        if (this.parent && this.parent.children.indexOf(this) < 0) {
            console.error("sanity 1 failed");
            return false;
        }
        array.forEach(this.children, function(at, i) {
            if (false === (ret = ret && at.sanityCheck()))
                return;
        });
        return ret;
    }