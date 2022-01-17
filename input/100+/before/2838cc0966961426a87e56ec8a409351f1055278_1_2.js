function(depth,test) {
        if (undefined === depth || null === depth)
            depth = 0;
        var s = tabs(depth);
        var ok = "";
        var ok2 = "";
        if (!this.diffId.wont)
            ok2 = "("+this.diffId+")";
        if(test)
            var ok = test[this.diffId] ? ("("+this.diffId+"="+test[this.diffId].diffId+")") : "";
        //if (Node.ELEMENT_NODE == this.nodeType)
        if (this.beginTag)
            s += this.beginTag;
        if (this.text)
            s += this.text;
        s += this.id+"\n";
        //else
        //    s += this.text + ok2 + "\n";
        ++depth;
        array.forEach(this.children, function(child, i) {
            s += child.toString(depth,test);
        });
        return s;
    }