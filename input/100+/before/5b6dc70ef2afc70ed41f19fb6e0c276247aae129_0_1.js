function() {

		var image = new Kinetic.Image({x: 20,y: 500,image: imageObj2,width: 30,height: 33});

		image.on("click",chooseColorBE.bind(window,"plains"));

		image.on("mouseover",function(){document.body.style.cursor = "pointer";});

		image.on("mouseout",function(){document.body.style.cursor = "default";});

		FixedLayer.add(image);

		FixedLayer.draw();

	}