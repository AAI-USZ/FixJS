function () {
	var node = new cc.Node();
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
	node.addChild(s1);

	// simple wave 3d
	var gridSize = new cc.GridSize;
	gridSize.x = 15;
	gridSize.y = 10;
	var wave = cc.Waves3D.actionWithWaves(5, 40, gridSize, 3);
	scene.runAction(wave);

	// add the menu
	var menu = createMenu("Test Sequence");
	scene.addChild(node);
	scene.addChild(menu, 1);

	return scene;
}