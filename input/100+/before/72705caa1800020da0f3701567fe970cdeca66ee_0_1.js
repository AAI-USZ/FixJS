function () {
	var s1 = cc.Sprite.create("grossini_dance_05.png");
	s1.position = cc.Point.create(winSize.width / 2 + 50, winSize.height / 2);
	var s2 = cc.Sprite.create("grossinis_sister1.png");
	s2.position = cc.Point.create(winSize.width / 2 - 50, winSize.height / 2);

	var moveTo = cc.MoveTo.create(2.0, cc.Point.create(winSize.width, winSize.height / 2));
	var moveBy = cc.MoveBy.create(2.0, cc.Point.create(100, 100));

	s1.runAction(moveTo);
	s2.runAction(moveBy);

	var scene = cc.Scene.create();
	scene.addChild(s1);
	scene.addChild(s2);

	// add the menu
	var menu = createMenu("Test Move");
	scene.addChild(menu, 1);

// test menuToggle
    cc.MenuItemFont.setFontName("Arial");
    cc.MenuItemFont.setFontSize(26);
    var item1 = cc.MenuItemToggle.create(
		    	this, 
		    	function (sender){
			        cc.log("toggle click....");
		    	},
		        cc.MenuItemFont.create("On"),
		        cc.MenuItemFont.create("Off")
        );
    cc.MenuItemFont.setFontName("Arial");
    cc.MenuItemFont.setFontSize(18);
    var title2 = cc.MenuItemFont.create("Mode");
    title2.isEnabled = false;
    title2.position = cc.Point.create(0, 50);

    item1.position = cc.Point.create(240, 160);

	var label = cc.LabelTTF.create("Go back", "Arial", 14);
    var back = cc.MenuItemLabel.create(label, this, 
    	function (sender)
    	{
    		cc.log("menuItemLabel click...");
    	}
    	);
    back.position = cc.Point.create(0,20);
    

    var toggleMenu = cc.Menu.create(item1, title2, back);
    scene.addChild(toggleMenu);

    return scene;
}