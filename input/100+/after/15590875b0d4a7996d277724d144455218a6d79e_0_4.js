function (labelText) {
	var hudMenu = new cc.Menu();
	hudMenu.init();

	var b1 = new cc.Sprite(); b1.initWithFile("b1.png");
	var b2 = new cc.Sprite(); b2.initWithFile("b2.png");

	item1 = cc.MenuItemSprite.create(b1, b2, this, 
		function (sender) {
			prevScene();
		}
	);

	var r1 = new cc.Sprite(); r1.initWithFile("r1.png");
	var r2 = new cc.Sprite(); r2.initWithFile("r2.png");
	item2 = cc.MenuItemSprite.create(r1, r2, this,
		function (sender) {
			// cc.executeScript("JS/1to1/test_actions.js");
			playCurrentScene();
		}
	);

	var f1 = new cc.Sprite(); f1.initWithFile("f1.png");
	var f2 = new cc.Sprite(); f2.initWithFile("f2.png");
	item3 = cc.MenuItemSprite.create(f1, f2, this,
		function (sender)
		{
			nextScene();
		}
	);

	var c1 = new cc.Sprite(); c1.initWithFile("r1.png");
	var c2 = new cc.Sprite(); c2.initWithFile("r2.png");
	item4 = cc.MenuItemSprite.create(c1, c2, this,
		function (sender)
		{
			cc.executeScript("JS/1to1/test_actions.js");
		}
	);

	item1.position = cc.Point.create(winSize.width / 2 - 100, 30);
	item2.position = cc.Point.create(winSize.width / 2      , 30);
	item3.position = cc.Point.create(winSize.width / 2 + 100, 30);
	item4.position = cc.Point.create(30, winSize.height - 30);

	hudMenu.addChild(item1);
	hudMenu.addChild(item2);
	hudMenu.addChild(item3);
	hudMenu.addChild(item4);
	hudMenu.position = pointZero;

	if (labelText) {
		var label = cc.LabelTTF.create(labelText, sizeZero, 0, "Arial", 18.0);
        var menuLabel = new cc.MenuItemLabel();
        menuLabel.initWithLabel(label);
		menuLabel.position = cc.Point.create(winSize.width / 2, winSize.height - 30);
		hudMenu.addChild(menuLabel);
	}

	// just to avoid GC
	hudMenu.items = [item1, item2, item3];
	return hudMenu;
}