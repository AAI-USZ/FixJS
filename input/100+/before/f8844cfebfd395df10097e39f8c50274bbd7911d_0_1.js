function(data){
	var context = this.domNode;

	on(context, on.selector("a.jsdoc-link", "click"), function(evt){
		evt.preventDefault();

		// Open tab for specified module
		var tmp = this.href.replace(window.location.href, "").replace(/#.*/, "").split("/");
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
	});

	// This is for navigating from "method summary" area and scrolling down to the method details.
	on(context, on.selector("a.inline-link", "click"), function(evt){
		evt.preventDefault();
		var target = query('a[name="' + this.href.substr(this.href.indexOf('#')+1) + '"]', context);
		if(target){
			var anim = smoothScroll({
				node: target[0],
				win: context,
				duration: 600
			}).play();
		}
	});

	//	build the toolbar.
	var link = null, perm = query("div.jsdoc-permalink", context), l = window.location;
	if(perm.length){
		link = (page.length ? baseUrl : "") + perm[0].innerHTML;
	}
	var tbc = (link ? '<span class="jsdoc-permalink"><a class="jsdoc-link" href="' + link + '">Permalink</a></span>' : '')
		+ '<label>View options: </label>'
		+ '<span class="trans-icon jsdoc-private"><img src="' + baseUrl + 'css/icons/24x24/private.png" align="middle" border="0" alt="Toggle private members" title="Toggle private members" /></span>'
		+ '<span class="trans-icon jsdoc-inherited"><img src="' + baseUrl + 'css/icons/24x24/inherited.png" align="middle" border="0" alt="Toggle inherited members" title="Toggle inherited members" /></span>';
	var toolbar = dojo.create("div", {
		className: "jsdoc-toolbar",
		innerHTML: tbc		
	}, this.domNode, "first");

	//	if SyntaxHighlighter is present, run it in the content
	if(SyntaxHighlighter){
		SyntaxHighlighter.highlight();
	}

	var privateOn = false, inheritedOn = true;
	//	hide the private members.
	query("div.private, li.private", this.domNode).style("display", "none");

	//	make the summary sections collapsible.
	query("h2.jsdoc-summary-heading", this.domNode).forEach(function(item){
		dojo.connect(item, "onclick", function(e){
			var d = e.target.nextSibling;
			while(d.nodeType != 1 && d.nextSibling){ d = d.nextSibling; }
			if(d){
				var dsp = dojo.style(d, "display");
				dojo.style(d, "display", (dsp=="none"?"":"none"));
				query("span.jsdoc-summary-toggle", e.target).forEach(function(item){
					dojo[(dsp=="none"?"removeClass":"addClass")](item, "closed");
				});
			}
		});

		query("span.jsdoc-summary-toggle", item).addClass("closed");

		//	probably should replace this with next or something.
		var d = item.nextSibling;
		while(d.nodeType != 1 && d.nextSibling){ d = d.nextSibling; }
		if(d){
			dojo.style(d, "display", "none");
		}
	});

	//	set up the buttons in the toolbar.
	query("div.jsdoc-toolbar span.trans-icon", this.domNode).forEach(function(node){
		if(dojo.hasClass(node, "jsdoc-private")){
			dojo.addClass(node, "off");
			dojo.connect(node, "onclick", dojo.hitch(this, function(e){
				privateOn = !privateOn;
				dojo[(privateOn ? "removeClass" : "addClass")](node, "off");
				query("div.private, li.private", this.domNode).forEach(function(n){
					var state = (privateOn ? "" : "none");
					dojo.style(n, "display", state);
				});
			}));
		} else {
			dojo.connect(node, "onclick", dojo.hitch(this, function(e){
				inheritedOn = !inheritedOn;
				dojo[(inheritedOn ? "removeClass" : "addClass")](node, "off");
				query("div.inherited, li.inherited", this.domNode).forEach(function(n){
					var state = (inheritedOn ? "" : "none");
					if(!(!privateOn && dojo.hasClass(n, "private"))){
						dojo.style(n, "display", state);
					}
				});
			}));
		}
	});

	//	set the title
	var w = registry.byId("content").selectedChildWidget;
	document.title = w.title + " - " + (siteName || "The Dojo Toolkit");
	
	//	set the content of the printBlock.
	dojo.byId("printBlock").innerHTML = w.domNode.innerHTML;
}