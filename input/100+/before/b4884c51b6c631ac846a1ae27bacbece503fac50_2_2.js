function() {

    if (!goog.isDef(this.targetNode) || !this.targetNode.inTree_) return;

    var target = this.targetNode;
    //todo: replace with bounds method
    var bb = this.getFrame();
    var tl = new goog.math.Coordinate(bb.left, bb.top);
    var tr = new goog.math.Coordinate(bb.right, bb.top);
    var br = new goog.math.Coordinate(bb.right, bb.bottom);

    var targetParent = target.getParent();

    tl = this.localToNode(tl, targetParent);
    tr = this.localToNode(tr, targetParent);
    br = this.localToNode(br, targetParent);
    /*
    console.log('tl: '+tl.x+' '+tl.y);
    console.log('tr: '+tr.x+' '+tr.y);
    console.log('br: '+br.x+' '+br.y);
    */
    var rot = Math.atan2(tl.y - tr.y, tr.x - tl.x);


    var x1 = tr.x - tl.x;
    var y1 = tl.y - tr.y;

    var x2 = br.x - tr.x;
    var y2 = br.y - tr.y;

    var cos = Math.cos(rot);
    var sin = Math.sin(rot);


    this.mWidth = Math.round(Math.sqrt(x1 * x1 + y1 * y1));
    this.mHeight = Math.round(Math.sqrt(x2 * x2 + y2 * y2));

    if (target.renderer.getType() == lime.Renderer.DOM) {
        var el = target.rootElement;

        //todo: can be optimized
        goog.style.setSize(el, this.mWidth, this.mHeight);

        lime.style.setTransform(el, new lime.style.Transform().setPrecision(.1).
            translate(tl.x, tl.y).rotate(-rot, 'rad'));
    }

    if (this.renderer.getType() == lime.Renderer.DOM) {
       this.domElement.style['display'] = 'none';
    }

    this.mPos = target.parentToLocal(tl.clone());

    this.mSet = true;
    this.mX = cos * tl.x - sin * tl.y;
    this.mY = cos * tl.y + sin * tl.x;
    this.mRot = rot;
/*
    target.setDirty(lime.Dirty.POSITION);
    target.update();
*/

}