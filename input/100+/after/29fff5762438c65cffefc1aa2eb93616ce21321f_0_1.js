function OnEnterPreloadState()
{
	var text = new Text("Loading ...", "36px Arial", "#777");
	stage.addChild(text);
	text.x = 360;
	text.y = 200;

	assets = [];

	var manifest = [
		{src:'./img/verticalsky.jpg', id:"sky"},
		{src:'./img/menubg.png', id:"menubackground"},
		{src:'./img/menustart.png', id:"menustart"},
		{src:'./img/menustartactive.png', id:"menustartactive"},
		{src:'./img/burger/bottom.png', id:"bottom"},
		{src:'./img/burger/cheese.png', id:"cheese"},
		{src:'./img/burger/egg.png', id:"egg"},
		{src:'./img/burger/lettuce.png', id:"lettuce"},
		{src:'./img/burger/meat.png', id:"meat"},
		{src:'./img/burger/onion.png', id:"onion"},
		{src:'./img/burger/tomato.png', id:"tomato"},
		{src:'./img/burger/top.png', id:"top"},
	];
	
	var loader = new PreloadJS();
	loader.useXHR = false; //Loads the images using tag loading.
	
	loader.onFileLoad = handleFileLoad;
	loader.onComplete = handleComplete;
	
	loader.loadManifest(manifest);
}