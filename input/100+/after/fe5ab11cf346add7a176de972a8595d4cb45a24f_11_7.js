function () {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var group = map.objectGroupNamed("Object Group 1");
        var objects = group.getObjects();
        for (var i = 0; i < objects.length; i++) {
            var dict = objects[i];
            if (!dict)
                break;

            var x = dict["x"];
            var y = dict["y"];
            var width = dict["width"];
            var height = dict["height"];

            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.ccp(x, y), cc.ccp((x + width), y));
            cc.drawingUtil.drawLine(cc.ccp((x + width), y), cc.ccp((x + width), (y + height)));
            cc.drawingUtil.drawLine(cc.ccp((x + width), (y + height)), cc.ccp(x, (y + height)));
            cc.drawingUtil.drawLine(cc.ccp(x, (y + height)), cc.ccp(x, y));

            cc.renderContext.lineWidth = 1;
        }
    }