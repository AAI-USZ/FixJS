function (s) {
        this._AnchorPoint = s;
        var size = this.getContentSize();
        if (this._ignoreAnchorPointForPosition) {
            this.dom.style.left = "-" + (s.x * size.width) + "px";
            this.dom.style.top = "-" + (s.y * size.height) + "px";
            this.dom.style[cc.CSS3.origin] = (s.x * 100) + "% " + (s.y * -size.height) + "px";
        }
        else {
            this.dom.style[cc.CSS3.origin] = (s.x * 100) + "% " + (s.y * -size.height) + "px";
            this.dom.style.top = 0;
            this.dom.style.left = 0;
        }
        this.dom.style.width = size.width + "px";
        this.dom.style.maxHeight = size.height + "px";
    }