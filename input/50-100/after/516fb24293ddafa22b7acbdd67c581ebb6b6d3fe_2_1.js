function(){
        var parentNode = this[0] && this[0].parentNode,
            array = !parentNode && [];
        baidu.dom._smartInsert(this, arguments, function(node){
            parentNode ? parentNode.insertBefore(node, this.nextSibling)
                : baidu.merge(array, node.childNodes);
        });
        array && baidu.merge(this, array);
        return this;
    }