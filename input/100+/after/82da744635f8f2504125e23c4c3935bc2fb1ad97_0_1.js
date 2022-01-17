function(evt){
		// Don't do this code for the permalink button, that's handled in a different place
		if(domClass.contains(this.parentNode, "jsdoc-permalink")){
			return;
		}

		// Stop the browser from navigating to a new page
		evt.preventDefault();

		// Open tab for specified module
		var tmp = this.href.replace(baseUrl, "").replace(/#.*/, "").split("/");
		var version = tmp[0];
		var page = tmp.slice(1).join("/");
		var pane = addTabPane(page, version);

		// After the page has loaded, scroll to specified anchor in the page
		var anchor = this.href.replace(/.*#/, "");
		if(anchor){
			pane.onLoadDeferred.then(function(){
				var target = query('a[name="' + anchor + '"]', context);
				if(target){
					var anim = smoothScroll({
						node: target[0],
						win: context,
						duration: 600
					}).play();
				}
			});
		}
	}