function Composite()
{
    this.polygons = [];
    var that = this;

    this.add = function(polygon)
    {
        that.polygons[polygon.id] = polygon;
    };

    this.getProperty = function(name)
    {
        var res = 0;
        for (var i in this.polygons)
        {
            res += that.polygons[i].getProperty(name);
        }
        return res;
    };

    this.setColor = function(color)
    {
        for (var i in that.polygons)
        {
            that.polygons[i].setColor(color)
        }
    };

    this.setProperty = function(key, val)
    {

        for (var i in this.polygons)
        {
            that.polygons[i].setProperty(key, val)
        }
    };

    this.getProperties = function()
    {
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
                var prop = that.polygons[i].getProperty(j);
                res[j] += (prop == null) ? undefined : prop;
            }
        }
        res.area = that.getProperty('area');
        return res;
    };
}