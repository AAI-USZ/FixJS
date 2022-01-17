function () {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var group = map.objectGroupNamed("Object Group 1");
        var objects = group.getObjects();
        var dict;
        for (var i = 0, len = objects.length; i < len; i++) {
            dict = objects[i];
            if (!dict)
                break;

            var x = parseInt(dict["x"]);
            var y = parseInt(dict["y"]);
            var width = parseInt(dict["width"]);
            var height = parseInt(dict["height"]);

            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.ccp(x, y), cc.ccp(x + width, y));
            cc.drawingUtil.drawLine(cc.ccp(x + width, y), cc.ccp(x + width, y + height));
            cc.drawingUtil.drawLine(cc.ccp(x + width, y + height), cc.ccp(x, y + height));
            cc.drawingUtil.drawLine(cc.ccp(x, y + height), cc.ccp(x, y));

            cc.renderContext.lineWidth = 1;
        }
    }