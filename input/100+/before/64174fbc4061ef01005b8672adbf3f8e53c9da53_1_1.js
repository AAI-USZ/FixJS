function() {

	var fontSize = 36;
	var tl = this.title.length;
	fontSize = (winSize.width / tl) * 1.60;
	if( fontSize/winSize.width > 0.09 ) {
		fontSize = winSize.width * 0.09;
	}

	this.label = cc.LabelTTF.create(this.title, "Gill Sans", fontSize);
	this.addChild(this.label, 100);

	var isMain = this.isMainTitle;

	if( isMain == true )
		this.label.setPosition( centerPos );
	else
		this.label.setPosition( cc.p(winSize.width / 2, winSize.height*11/12) );

	var subStr = this.subtitle;
	if (subStr != "") {
		tl = this.subtitle.length;
		var subfontSize = (winSize.width / tl) * 1.3;
		if( subfontSize > fontSize *0.6 ) {
			subfontSize = fontSize *0.6;
		}

		this.sublabel = cc.LabelTTF.create(subStr, "Thonburi", subfontSize);
		this.addChild(this.sublabel, 90);
		if( isMain )
			this.sublabel.setPosition( cc.p(winSize.width / 2, winSize.height*3/8 ));
		else
			this.sublabel.setPosition( cc.p(winSize.width / 2, winSize.height*5/6 ));
	} else
		this.sublabel = null;

	// WARNING: MenuItem API will change!
	var item1 = cc.MenuItemImage.itemWithNormalImageSelectedimageBlock("b1.png", "b2.png", this.backCallback);
	var item2 = cc.MenuItemImage.itemWithNormalImageSelectedimageBlock("r1.png", "r2.png", this.restartCallback);
	var item3 = cc.MenuItemImage.itemWithNormalImageSelectedimageBlock("f1.png", "f2.png", this.nextCallback);

	 [item1, item2, item3].forEach( function(item) {
		item.normalImage().setOpacity(45);
		item.selectedImage().setOpacity(45);
		} );

	var menu = cc.Menu.create( item1, item2, item3 );

	menu.setPosition( cc.p(0,0) );
	item1.setPosition( cc.p(winSize.width / 2 - 100, 30));
	item2.setPosition( cc.p(winSize.width / 2, 30));
	item3.setPosition( cc.p(winSize.width / 2 + 100, 30));

	this.addChild(menu, 80);
}