function (name) {
        var res = 0;
        for (var i in this.polygons) {
            res += that.polygons[i].getProperty(name);
        }
        return res;
    }