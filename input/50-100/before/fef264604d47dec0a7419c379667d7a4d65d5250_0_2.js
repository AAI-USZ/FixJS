function(flag){
            if(!this.rootNode) this.rootNode = this.getRootNode(this.root);
            if(flag) return util.removeClass(this.rootNode, this.hideClass);
            util.addClass(this.rootNode, this.hideClass);
        }