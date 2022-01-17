function(lang, aspect, dom, has, registry, parser, ListItem, at){
	if(!has("webkit")){
		require(["dojox/mobile/compat"]);
	}
	// A workaround for dojox/mobile/_ItemBase.onTouchStart() running setTimeout() callback even if the widget has been destroyed. It causes JavaScript error in our "delete" feature.
	aspect.around(ListItem.prototype, "_setSelectedAttr", function(oldSetSelectedAttr){
		return function(){
			if(!this._beingDestroyed){
				return oldSetSelectedAttr.apply(this, lang._toArray(arguments));
			}
		};
	});
	window.at = at;
	parser.parse();
	dom.byId("wholepage").style.display = "";
}