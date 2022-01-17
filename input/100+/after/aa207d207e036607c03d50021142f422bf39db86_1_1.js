function(depth,test) {
        if (undefined === depth || null === depth)
            depth = 0;
        var s = tabs(depth);
        if (this.beginTag)
            s += this.beginTag;
        if (this.text)
            s += this.text;
        s += "id="+this.id+"\n";
        ++depth;
        array.forEach(this.children, function(child, i) {
            s += child.toString(depth,test);
        });
        return s;
    }