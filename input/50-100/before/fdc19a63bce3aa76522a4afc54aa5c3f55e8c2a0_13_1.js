function (args) {
        this.dom.id = "DomMenu" + Date.now();
        this.dom.className += " domMenu";
        this._isRelativeAnchorPoint = false;
        this.setContentSize(cc.Director.sharedDirector().getWinSize());
        for (var i = 0; i < args.length; i++) {
            if (args[i]) {
                //this.dom.appendChild(args[i].dom);//we dont need to append child as the child will set parent, and add to the parent
                this.addChild(args[i]);
            }
        }
    }