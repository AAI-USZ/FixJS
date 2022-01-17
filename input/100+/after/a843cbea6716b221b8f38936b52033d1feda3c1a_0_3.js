function(){
	parser.parse(document.body);
	var w = registry.byId("content");
	if(w){
		w.watch("selectedChildWidget", function(attr, oldVal, selectedChildWidget){
			document.title = selectedChildWidget.title + " - " + (siteName || "The Dojo Toolkit");
		});
	}

	// global:
	helpDialog = new dijit.Dialog({ title: "Feedback" }).placeAt(document.body);
	helpDialog.startup();
	var s = dom.byId("versionSelector");
	s.onchange = lang.hitch(s, versionChange);

	buildTree();

	if(page && currentVersion) {
		var p = addTabPane(page, currentVersion);

		//	handle any URL hash marks.
		if(p && window.location.hash.length){
			var h = p.onLoadDeferred.then(function(){
				var target = query('a[name$="' + window.location.hash.substr(window.location.hash.indexOf('#')+1) + '"]', p.domNode);
				if(target.length){
					var anim = smoothScroll({
						node: target[0],
						win: p.domNode,
						duration: 600
					}).play();
				}
			});
		}
	}
}