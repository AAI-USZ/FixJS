function () {
        var a = [];
        var asmtest = cc.SpriteBatchNode.create(s_ghosts);

        for (var i = 0; i < 10; i++) {
            var s1 = cc.Sprite.createWithTexture(asmtest.getTexture(), cc.RectMake(0, 0, 50, 50));
            a.push(s1);
            asmtest.addChild(s1, 10);
        }

        for (i = 0; i < 10; i++) {
            if (i != 5)
                asmtest.reorderChild(a[i], 9);
        }

        var prev = -1;
        var children = asmtest.getChildren();

        for (i = 0; i < children.length; i++) {
            var child = children[i];
            if (!child)
                break;

            //TODO need fixed
            var currentIndex = child.getAtlasIndex();
            //cc.Assert(prev == currentIndex - 1, "Child order failed");
            ////----UXLog("children %x - atlasIndex:%d", child, currentIndex);
            prev = currentIndex;
        }

        prev = -1;
        var sChildren = asmtest.getDescendants();
        for (i = 0; i < sChildren.length; i++) {
            child = sChildren[i];
            if (!child)
                break;

            var currentIndex = child.getAtlasIndex();
            //cc.Assert(prev == currentIndex - 1, "Child order failed");
            ////----UXLog("descendant %x - atlasIndex:%d", child, currentIndex);
            prev = currentIndex;
        }
    }