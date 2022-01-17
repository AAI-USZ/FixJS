function(){
        if(this[0] && this[0].parentNode){
            baidu.dom._smartInsert(this, arguments, function(node){
                this.parentNode.insertBefore(node, this.nextSibling);
            });
        }else if(arguments.length){
            baidu.merge(this, baidu.dom._buildElements(arguments, this.getDocument() || document));
        }
        return this;
    }