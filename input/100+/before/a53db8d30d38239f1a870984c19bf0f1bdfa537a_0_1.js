function(){
		var fps = 60;
		var interval = 1000/60;
		setInterval(mainloop, interval);

		bigContainer = new Container();
		bigContainer.name = "BigContainer";
		bigContainer.x = 50;
		bigContainer.y = 50;
		stage.addChild(bigContainer);

		container = new Container();
		container.name = "Sub Container";
		bigContainer.addChild(container);


		bmp = new Bitmap('img/rails.png');
		bmp.anchorX = 25;
		bmp.anchorY = 32;
		container.addChild(bmp);
		bmp.radian = Math.PI/4;

		for(var i=0; i<1000; ++i){
			var b = new Bitmap('img/rails.png');
			if(Math.random() < 0.8){
				b.anchorX = 25;
				b.anchorY = 32;
			}
			b.scaleX = b.scaleY = 0.2;
			b.dr = Math.random()*0.2;
			b.x = b.tx = Math.random()*500;
			b.y = b.ty = Math.random()*300;
			b.dm = Math.random()*10 + 5;
			movingBmps.push(b);
			container.addChild(b);
		}

		canvas.addEventListener('click', bind(this, function(e){
			console.log("Mouse click: " + e.clientX + "," + e.clientY);


			// var invert = bigContainer.concatedMatrix.clone().invert();
			// var clickPos = invert.transform(new Vec2(e.clientX, e.clientY));
			var clickPos = bigContainer.getGlobalVec2(new Vec2(e.clientX, e.clientY));
			console.log(clickPos.x, clickPos.y);
			bmp.x = clickPos.x;
			bmp.y = clickPos.y;

		}, false));

		enlargeComplete();
	}