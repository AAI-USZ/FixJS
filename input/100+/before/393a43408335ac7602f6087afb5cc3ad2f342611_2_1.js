function (p) {
        if (this.dom) {//if self doesnt have a dom, then its a CCnode, no point in adding dom to the parent
            if (!p.dom) {//if the dom node parent is a ccnode, and it do not have its dom, we make one
                p.initDom();
                var type = " CCNode";
                if (p instanceof cc.Scene) {
                    type = " Scene";
                }
                else if (p instanceof cc.Layer) {
                    type = " Layer";
                }
                else if (p instanceof cc.Sprite) {
                    type = " Sprite";
                }
                else {
                    console.log(p);
                }
                p.dom.id = type + Date.now();
                p.dom.className += type;
            }
            p.dom.appendChild(this.dom);
            if (p.getIsRunning()) {
                p.show();
            }
            /*            if(!p.isIgnoreAnchorPointForPosition())
             {
             this.dom.style.marginLeft = (-this.getParent().getContentSize().width/2) + "px";
             this.dom.style.marginTop = (this.getParent().getContentSize().height/2) + "px";
             }*/
        }

        //if the parent also have a parent
        if (p.getParent()) {
            //run this function again for the parent
            p.setParentDiv(p.getParent());
        }
        //else, the parent doesnt have anymore parent
        //we dont know if the parent is the top most level, as it could be not run yet.
        //but if a domnode is added after the scene ran, then, getisRunning will return true, and so in this case,
        //if parent have no more parent, but it is running, we add the parent to the domContainer
        else if (p.getIsRunning) {
            if (!p.dom) {
                p.initDom();
                var type = " CCNode";
                if (p instanceof cc.Scene) {
                    type = " Scene";
                }
                else if (p instanceof cc.Layer) {
                    type = " Layer";
                }
                else if (p instanceof cc.Sprite) {
                    type = " Sprite";
                }
                else {
                    console.log(p);
                }
                p.dom.id = (p instanceof cc.Scene) ? "Scene" + Date.now() : "CCNode" + Date.now();
                p.dom.className += type;
            }
            cc.domNode.DomContainer().appendChild(p.dom);
            p.show();
        }
        if (p.dom) {
            p._updateTransform();
            p._updateAnchorPoint();
        }
    }