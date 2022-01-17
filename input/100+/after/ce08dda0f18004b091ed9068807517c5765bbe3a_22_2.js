function (ctx) {
        this._super();
        var context = ctx || cc.renderContext;
        //LabelBMFont - Debug draw
        if (cc.LABELBMFONT_DEBUG_DRAW) {
            var s = this.getContentSize();
            var pos = new cc.Point(0 | ( -this._anchorPointInPoints.x), 0 | ( -this._anchorPointInPoints.y));
            var vertices = [cc.ccp(pos.x, pos.y), cc.ccp(pos.x + s.width, pos.y), cc.ccp(pos.x + s.width, pos.y + s.height), cc.ccp(pos.x, pos.y + s.height)];
            context.strokeStyle = "rgba(0,255,0,1)";
            cc.drawingUtil.drawPoly(vertices, 4, true);
        }
    }