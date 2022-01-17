function OnEnterPreloadState()
{
	var text = new Text("Loading ...", "36px Arial", "#777");
	stage.addChild(text);
	text.x = 360;
	text.y = 200;

	assets = [];

	var manifest = [
		{src:'./img/verticalsky.jpg', id:"sky"},
		{src:'./img/menubg.jpg', id:"menubackground"},
		{src:'./img/menustart.jpg', id:"menustart"},
		{src:'./img/menustartactive.jpg', id:"menustartactive"},
		{src:'./img/burger/bottom.jpg', id:"bottom"},
		{src:'./img/burger/cheese.jpg', id:"cheese"},
		{src:'./img/burger/egg.jpg', id:"egg"},
		{src:'./img/burger/lettuce.jpg', id:"lettuce"},
		{src:'./img/burger/meat.jpg', id:"meat"},
		{src:'./img/burger/onion.jpg', id:"onion"},
		{src:'./img/burger/tomato.jpg', id:"tomato"},
		{src:'./img/burger/top.jpg', id:"top"},
	];
	
	var loader = new PreloadJS();
	loader.useXHR = false; //Loads the images using tag loading.
	
	loader.onFileLoad = handleFileLoad;
	loader.onComplete = handleComplete;
	
	loader.loadManifest(manifest);
}