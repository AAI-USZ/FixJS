function(dom, has, parser, at){
	if(!has("webkit")){
		require(["dojox/mobile/compat"]);
	}
	window.at = at;
	parser.parse();
	dom.byId("wholepage").style.display = "";
}