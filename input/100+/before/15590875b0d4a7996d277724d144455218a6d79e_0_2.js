function () {
	var s1 = new cc.Sprite.create("grossini_dance_05.png");
	s1.position = cc.Point.create(winSize.width / 2 + 50, winSize.height / 2);

	var rotate1 = new cc.RotateBy();
	rotate1.initWithDuration(1.0, 90);
	var moveBy = new cc.MoveBy();
	moveBy.initWithDuration(2.0, cc.Point.create(100, 100));
	var rotate2 = rotate1.reverse();
	var delay = cc.DelayTime.actionWithDuration(1.5);

	var seq = cc.Sequence.actions(rotate1, moveBy, delay, rotate2);
	s1.runAction(seq);

	var scene = new cc.Scene(); scene.init();
	scene.addChild(s1);

	// add the menu
	var menu = createMenu("Test Sequence");
	scene.addChild(menu, 1);

	return scene;
}