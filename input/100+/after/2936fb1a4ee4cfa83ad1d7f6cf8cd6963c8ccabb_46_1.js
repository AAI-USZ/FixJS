function (tag) {
// create
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA8888);

        var sprite = null;
        switch (this._subtestNumber) {
            case 1:
            {
                sprite = cc.Sprite.create("Resources/Images/grossinis_sister1.png");
                this._parent.addChild(sprite, 0, tag + 100);
                break;
            }
            case 2:
            case 3:
            {
                sprite = cc.Sprite.createWithTexture(this._batchNode.getTexture(), cc.RectMake(0, 0, 52, 139));
                this._batchNode.addChild(sprite, 0, tag + 100);
                break;
            }
            case 4:
            {
                var idx = parseInt(cc.RANDOM_0_1() * 14) + 1;
                idx = idx < 10 ? "0" + idx : idx.toString();
                var str = "Resources/Images/grossini_dance_" + idx + ".png";
                sprite = cc.Sprite.create(str);
                this._parent.addChild(sprite, 0, tag + 100);
                break;
            }
            case 5:
            case 6:
            {
                var idx = 0 | (cc.RANDOM_0_1() * 14);
                var x = (idx % 5) * 85;
                var y = (0 | (idx / 5)) * 121;
                sprite = cc.Sprite.createWithTexture(this._batchNode.getTexture(), cc.RectMake(x, y, 85, 121));
                this._batchNode.addChild(sprite, 0, tag + 100);
                break;
            }

            case 7:
            {
                var y, x;
                var r = 0 | (cc.RANDOM_0_1() * 64);

                y = parseInt(r / 8);
                x = parseInt(r % 8);

                var str = "Resources/Images/sprites_test/sprite-" + x + "-" + y + ".png";
                sprite = cc.Sprite.create(str);
                this._parent.addChild(sprite, 0, tag + 100);
                break;
            }

            case 8:
            case 9:
            {
                var y, x;
                var r = 0 | (cc.RANDOM_0_1() * 64);

                y = (0 | (r / 8)) * 32;
                x = (r % 8) * 32;
                sprite = cc.Sprite.createWithTexture(this._batchNode.getTexture(), cc.RectMake(x, y, 32, 32));
                this._batchNode.addChild(sprite, 0, tag + 100);
                break;
            }

            default:
                break;
        }

        cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_DEFAULT);

        return sprite;
    }