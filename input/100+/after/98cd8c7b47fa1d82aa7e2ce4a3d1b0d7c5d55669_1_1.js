function () {

        var bRet = false;

            if (this._super()) {

            // background

            var bg = cc.Sprite.create(s_background);

            bg.setAnchorPoint(cc.PointZero());

            this.addChild(bg, 0, 1);

            

            var acceptNormal = cc.Sprite.create(s_start_menu, cc.RectMake(0, 0, 250, 210));

            var acceptSelected = cc.Sprite.create(s_start_menu, cc.RectMake(0, 210, 250, 210));

            var acceptDisabled = cc.Sprite.create(s_start_menu, cc.RectMake(0, 420, 250, 210));

            

            var accept = cc.MenuItemSprite.create(acceptNormal, acceptSelected, acceptDisabled, this, this.onAccept);

            var menu = cc.Menu.create(accept);

            menu.setScale(0.4);

            this.addChild(menu, 1, 2);

            menu.setAnchorPoint(cc.ccp(0,0));

            menu.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2 - 80));

            

            this.createTools();



            bRet = true;

        }

        return bRet;

    }