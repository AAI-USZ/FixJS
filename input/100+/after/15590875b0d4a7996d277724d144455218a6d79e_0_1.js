function () {
	var s1 = new cc.Sprite.create("grossini_dance_05.png");
	s1.position = cc.Point.create(winSize.width / 2 + 50, winSize.height / 2);
	var s2 = new cc.Sprite.create("grossinis_sister1.png");
	s2.rotation = 90;
	s2.position = cc.Point.create(winSize.width / 2 - 100, winSize.height / 2);

	var rotateTo = new cc.RotateTo();
	rotateTo.initWithDuration(1.0, 180.0);
	var rotateBy = cc.RotateBy.create(2.0, 90);

	s1.runAction(rotateTo);
	s2.runAction(rotateBy);

	var scene = new cc.Scene(); scene.init();
	scene.addChild(s1);
	scene.addChild(s2);

	// add the menu
	var menu = createMenu("Test Rotate");
	scene.addChild(menu, 1);

	return scene;
}