function loadFixedFrames() {

	var imgReady = 0;

	function testAndDraw(){

		//if (imgReady == 6) {layer.draw();} else {imgReady++; alert(imgReady);}

		layer.draw();

	}

	stage = new Kinetic.Stage({

	  container: "container",

	  width: 1280,

	  height: 900

	});

	layer = new Kinetic.Layer();

	cardLayer = new Kinetic.Layer();

	//draw section division lines

	var blueLine = new Kinetic.Line({

	  points: [240, 360, 1280, 360],

	  stroke: "green",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round",

	});

	

	var blueLine2 = new Kinetic.Line({

	  points: [240, 0, 240, 900],

	  stroke: "blue",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round"

	});

	

	var blueLine3 = new Kinetic.Line({

	  points: [0, 320, 240, 320],

	  stroke: "blue",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round"

	});

	

	var blueLine4 = new Kinetic.Line({

	  points: [0, 360, 240, 360],

	  stroke: "blue",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round"

	});

	

	var blueLine5 = new Kinetic.Line({

	  points: [0, 450, 240, 450],

	  stroke: "blue",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round"

	});



	var blueLine6 = new Kinetic.Line({

	  points: [0, 490, 240, 490],

	  stroke: "blue",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round"

	});



	var blueLine7 = new Kinetic.Line({

	  points: [150, 490, 150, 700],

	  stroke: "blue",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round"

	});



	var blueLine8 = new Kinetic.Line({

	  points: [0, 700, 240, 700],

	  stroke: "blue",

	  strokeWidth: 3,

	  lineCap: "round",

	  lineJoin: "round"

	});



	layer.add(blueLine);

	layer.add(blueLine2);

	layer.add(blueLine3);

	layer.add(blueLine4);

	layer.add(blueLine5);

	layer.add(blueLine6);

	layer.add(blueLine7);

	layer.add(blueLine8);

	

	//add timer

	var timerTitleText = new Kinetic.Text({

	  x: 40,

	  y: 335,

	  text: "Time Remaining : ",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle"

	});

	layer.add(timerTitleText);

	//frequent redraw timer layer

	timerLayer = new Kinetic.Layer();

	var timerText = new Kinetic.Text({

	  x: 170,

	  y: 335,

	  text: "15:00",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "green",

	  align: "center",

	  verticalAlign: "middle",

	  id: "timerText"

	});

	timer = 900;

	timerLayer.add(timerText);

	setInterval("timeDown();",1000);

	//cardback

	var imageObj = new Image();

	imageObj.onload = function() {

		var image = new Kinetic.Image({

			x: 0,

			y: 0,

			image: imageObj,

			width: 240,

			height: 320,

			id: "detailed"

			});

		layer.add(image);

		

		//image tooltip helper (middle button)

		var imageTooltip = new Kinetic.Image({

			x: 0,

			y: 0,

			image: imageObj,

			width: 240,

			height: 320,

			visible: false,

			id: "tooltip"

		});

		layer.add(imageTooltip);

		imageTooltip.setZIndex(99999);

		layer.draw();

	}

	//

	//five basic lands

	plains=island=swamp=mountain=forest=0;

	var imageObj2 = new Image();

	imageObj2.onload = function() {

		var image = new Kinetic.Image({

			x: 20,

			y: 500,

			image: imageObj2,

			width: 30,

			height: 33

			});

		image.on("click",addLands.bind(window,"plains"));

		image.on("mouseover",function(){document.body.style.cursor = "pointer";});

		image.on("mouseout",function(){document.body.style.cursor = "default";});

		layer.add(image);

		testAndDraw();

	}

	var imageObj3 = new Image();

	imageObj3.onload = function() {

		var image = new Kinetic.Image({

			x: 20,

			y: 540,

			image: imageObj3,

			width: 30,

			height: 33

			});

		image.on("click",addLands.bind(window,"island"));

		image.on("mouseover",function(){document.body.style.cursor = "pointer";});

		image.on("mouseout",function(){document.body.style.cursor = "default";});

		layer.add(image);

		testAndDraw();

	}

	var imageObj4 = new Image();

	imageObj4.onload = function() {

		var image = new Kinetic.Image({

			x: 20,

			y: 580,

			image: imageObj4,

			width: 30,

			height: 33

			});

		image.on("click",addLands.bind(window,"swamp"));

		image.on("mouseover",function(){document.body.style.cursor = "pointer";});

		image.on("mouseout",function(){document.body.style.cursor = "default";});

		layer.add(image);

		testAndDraw();

	}

	var imageObj5 = new Image();

	imageObj5.onload = function() {

		var image = new Kinetic.Image({

			x: 20,

			y: 620,

			image: imageObj5,

			width: 30,

			height: 33

			});

		image.on("click",addLands.bind(window,"mountain"));

		image.on("mouseover",function(){document.body.style.cursor = "pointer";});

		image.on("mouseout",function(){document.body.style.cursor = "default";});

		layer.add(image);

		testAndDraw();

	}

	var imageObj6 = new Image();

	imageObj6.onload = function() {

		var image = new Kinetic.Image({

			x: 20,

			y: 660,

			image: imageObj6,

			width: 30,

			height: 33

			});

		image.on("click",addLands.bind(window,"forest"));

		image.on("mouseover",function(){document.body.style.cursor = "pointer";});

		image.on("mouseout",function(){document.body.style.cursor = "default";});

		layer.add(image);

		testAndDraw();

	}

	imageObj.src = hostServerAddress+"assets/mtg/general/back.jpg";

	imageObj2.src = hostServerAddress+"assets/mtg/general/white.png";

	imageObj3.src = hostServerAddress+"assets/mtg/general/blue.png";

	imageObj4.src = hostServerAddress+"assets/mtg/general/black.png";

	imageObj5.src = hostServerAddress+"assets/mtg/general/red.png";

	imageObj6.src = hostServerAddress+"assets/mtg/general/green.png";

	

	//cards color count



	var colorsVisual = {"W":510,"U":550,"B":590,"R":630,"G":670};

	colorCardsNumber = {"W":0,"U":0,"B":0,"R":0,"G":0};

	for (i in colorsVisual) {

		if (colorsVisual.hasOwnProperty(i)) {

			var cardsCountText = new Kinetic.Text({

				  x: 165,

				  y: colorsVisual[i],

				  text: "0 " + i + " cards",

				  fontSize: 12,

				  fontFamily: "Calibri",

				  textFill: "green",

				  align: "center",

				  verticalAlign: "middle",

				  id: i+"Number"

			});

			layer.add(cardsCountText);

		}

	}

	//sort buttons

	//sort by color

	var buttonSortColor = new Kinetic.Rect({

	  x: 30,

	  y: 380,

	  width: 80,

	  height: 20,

	  fill: "#00D2FF",

	  stroke: "black",

	  strokeWidth: 2

	});

	layer.add(buttonSortColor);

	var buttonSortColorText = new Kinetic.Text({

	  x: 40,

	  y: 385,

	  text: "ColorSort",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle"

	});

	buttonSortColorText.on("mouseover",function(){document.body.style.cursor = "pointer";});

	buttonSortColorText.on("mouseout",function(){document.body.style.cursor = "default";});

	buttonSortColorText.on("click",sortByColor);

	layer.add(buttonSortColorText);

	

	//sort by cmc

	var buttonSortCMC = new Kinetic.Rect({

	  x: 130,

	  y: 380,

	  width: 80,

	  height: 20,

	  fill: "#00D2FF",

	  stroke: "black",

	  strokeWidth: 2

	});

	layer.add(buttonSortCMC);

	var buttonSortCMCText = new Kinetic.Text({

	  x: 140,

	  y: 385,

	  text: "CMCSort",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle"

	});

	buttonSortCMCText.on("mouseover",function(){document.body.style.cursor = "pointer";});

	buttonSortCMCText.on("mouseout",function(){document.body.style.cursor = "default";});

	buttonSortCMCText.on("click",sortByCMC);//sortByCMC;

	layer.add(buttonSortCMCText);

	

	//sort by rarity



	var buttonSortRarity = new Kinetic.Rect({

	  x: 30,

	  y: 410,

	  width: 80,

	  height: 20,

	  fill: "#00D2FF",

	  stroke: "black",

	  strokeWidth: 2

	});

	layer.add(buttonSortRarity);

	var buttonSortRarityText = new Kinetic.Text({

	  x: 38,

	  y: 415,

	  text: "RaritySort",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle"

	});

	buttonSortRarityText.on("mouseover",function(){document.body.style.cursor = "pointer";});

	buttonSortRarityText.on("mouseout",function(){document.body.style.cursor = "default";});

	buttonSortRarityText.on("click",sortByRarity);//sortByCMC;

	layer.add(buttonSortRarityText);



	//add land button

	

	var buttonAddLand = new Kinetic.Rect({

	  x: 130,

	  y: 410,

	  width: 80,

	  height: 20,

	  fill: "#FFFF00",

	  stroke: "black",

	  strokeWidth: 2

	});

	layer.add(buttonAddLand);

	var buttonAddLandText = new Kinetic.Text({

	  x: 135,

	  y: 415,

	  text: "Add Lands",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle"

	});

	buttonAddLand.on("mouseover",function(){document.body.style.cursor = "pointer";});

	buttonAddLand.on("mouseout",function(){document.body.style.cursor = "default";});

	buttonAddLand.on("click",function(){alert("Basic Land sort not implemented!")});

	layer.add(buttonAddLandText);

	

	//card count

	var cardCountHardCodedText = new Kinetic.Text({

	  x: 20,

	  y: 465,

	  text: "Main board:        Side Board:",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle"

	});

	layer.add(cardCountHardCodedText);



	var cardCountMBText = new Kinetic.Text({

	  x: 100,

	  y: 465,

	  text: "",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle",

	  id: "cardCountMBText"

	});

	layer.add(cardCountMBText);



	var cardCountSBText = new Kinetic.Text({

	  x: 210,

	  y: 465,

	  text: "",

	  fontSize: 12,

	  fontFamily: "Calibri",

	  textFill: "black",

	  align: "center",

	  verticalAlign: "middle",

	  id: "cardCountSBText"

	});

	layer.add(cardCountSBText);



	//finalize

	stage.add(timerLayer);

	stage.add(cardLayer);

	stage.add(layer);

	document.getElementById('container').firstChild.children[4].oncontextmenu = function() {

		return false;

	}

}