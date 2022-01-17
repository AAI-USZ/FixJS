function () {
        var bRet = false;
        if (this._super) {
            winSize = cc.Director.sharedDirector().getWinSize();
            var sp = cc.Sprite.create(s_loading);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.create(s_logo);
            logo.setAnchorPoint(cc.ccp(0, 0));
            logo.setPosition(cc.ccp(0, 250));
            this.addChild(logo, 10, 1);

            var newGameNormal = cc.Sprite.create(s_menu, cc.RectMake(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(s_menu, cc.RectMake(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(s_menu, cc.RectMake(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(s_menu, cc.RectMake(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(s_menu, cc.RectMake(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(s_menu, cc.RectMake(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(s_menu, cc.RectMake(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(s_menu, cc.RectMake(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(s_menu, cc.RectMake(252, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this, function () {
                this.onButtonEffect();
                flareEffect(this, this, this.onNewGame);
            });
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this, this.onSettings);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this, this.onAbout);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2 - 80));
            this.schedule(this.update, 0.1);

           var tmp = cc.TextureCache.sharedTextureCache().addImage(s_small_stone);
            this._ship = cc.Sprite.createWithTexture(tmp,cc.RectMake(0, 45, 60, 38));
            this.addChild(this._ship, 0, 4);
            this._ship.setPosition(cc.ccp(Math.random() * winSize.width, 0));
            this._ship.runAction(cc.MoveBy.create(2, cc.ccp(Math.random() * winSize.width, this._ship.getPosition().y + winSize.height + 100)));

            if (global.sound) {
                cc.AudioManager.sharedEngine().setBackgroundMusicVolume(0.7);
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_mainMainMusic, true);
            }

            bRet = true;
        }
        return bRet;
    }