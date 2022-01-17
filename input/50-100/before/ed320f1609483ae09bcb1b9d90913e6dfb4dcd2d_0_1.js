function() {
        var leaf = that.polygons.pop();
        var props = leaf.getProperties();
        that.polygons.push(leaf);

        var res = {};
        for (var j in props)
        {
            res[j] = 0;
        }

        for (var i in that.polygons)
        {
            for (var j in props)
            {
                res[j] += that.polygons[i].getProperty(j)
            }
        }
        return res;
    }