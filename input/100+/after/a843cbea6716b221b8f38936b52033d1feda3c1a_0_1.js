function(data){
	var context = this.domNode;

	// Setup listener so when you click on links to other modules, it opens a new tab rather than refreshing the
	// whole page
	on(context, on.selector("a.jsdoc-link", "click"), function(evt){
		// Don't do this code for the permalink button, that's handled in a different place
		if(domClass.contains(this.parentNode, "jsdoc-permalink")){
			return;
		}

		// Stop the browser from navigating to a new page
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


	function adjustLists(){
		// summary:
		//		Hide/show privates and inherited methods according to setting of private and inherited toggle buttons.
		//		Set/remove "odd" class on alternating rows.

		// The alternate approach is to do this through CSS: Toggle a jsdoc-hide-privates and jsdoc-hide-inherited
		// class on the pane's DOMNode, and use :nth-child(odd) to get the gray/white shading of table rows.   The
		// only problem (besides not working on IE6-8) is that the row shading won't account for hidden rows, so you
		// might get contiguous white rows or contiguous gray rows.

		// number of visible rows so far
		var cnt = 1;

		query(".jsdoc-property-list > *", context).forEach(function(li){
			var hide =
				(!extensionOn && domClass.contains(li, "extension")) ||
				(!privateOn && domClass.contains(li, "private")) ||
				(!inheritedOn && domClass.contains(li, "inherited"));
			domStyle.set(li, "display", hide ? "none" : "");
			domClass.toggle(li, "odd", cnt%2);
			if(!hide){
				cnt++;
			}
		});
	}

	//	build the toolbar.
	var link = query("div.jsdoc-permalink", context)[0].innerHTML;

	var tbc = (link ? '<span class="jsdoc-permalink"><a class="jsdoc-link" href="' + link + '">Permalink</a></span>' : '')
		+ '<label>View options: </label>'
		+ '<span class="trans-icon jsdoc-extension"><img src="' + baseUrl + 'css/icons/24x24/extension.png" align="middle" border="0" alt="Toggle extension module members" title="Toggle extension module members" /></span>'
		+ '<span class="trans-icon jsdoc-private"><img src="' + baseUrl + 'css/icons/24x24/private.png" align="middle" border="0" alt="Toggle private members" title="Toggle private members" /></span>'
		+ '<span class="trans-icon jsdoc-inherited"><img src="' + baseUrl + 'css/icons/24x24/inherited.png" align="middle" border="0" alt="Toggle inherited members" title="Toggle inherited members" /></span>';
	var toolbar = domConstruct.create("div", {
		className: "jsdoc-toolbar",
		innerHTML: tbc
	}, this.domNode, "first");

	var extensionBtn = query(".jsdoc-extension", toolbar)[0];
	on(extensionBtn, "click", function(e){
		extensionOn = !extensionOn;
		domClass.toggle(extensionBtn, "off", !extensionOn);
		adjustLists();
	});

	var privateBtn = query(".jsdoc-private", toolbar)[0];
	domClass.add(privateBtn, "off");	// initially off
	on(privateBtn, "click", function(e){
		privateOn = !privateOn;
		domClass.toggle(privateBtn, "off", !privateOn);
		adjustLists();
	});

	var inheritedBtn =  query(".jsdoc-inherited", toolbar)[0];
	on(inheritedBtn, "click", function(e){
		inheritedOn = !inheritedOn;
		domClass.toggle(inheritedBtn, "off", !inheritedOn);
		adjustLists();
	});


	//	if SyntaxHighlighter is present, run it in the content
	if(SyntaxHighlighter){
		// quick hack to convert <pre><code> --> <pre class="brush: js;" lang="javascript">,
		// as expected by the SyntaxHighlighter
		var children = query("pre code", context);
		children.forEach(function(child){
			var parent = child.parentNode,
				isXML = lang.trim(child.innerText || child.textContent).charAt(0) == "<";
			domConstruct.place("<pre class='brush: " + (isXML ? "xml" : "js") + ";'>" + child.innerHTML + "</pre>",
				parent, "after");
			domConstruct.destroy(parent);
		});

		// run highlighter
		SyntaxHighlighter.highlight();
	}

	// Setup feedback link and dialog
	var helpLink = domConstruct.create("a", {
		"class": "feedback",
		href: "https://docs.google.com/spreadsheet/viewform?hl=en_US&formkey=dFlDcHEyaHMwbEd4MFBObkNrX0E1MFE6MQ&entry_0=" + encodeURIComponent(link),
		target: "_blank",
		innerHTML: "Error in the documentation? Can’t find what you are looking for? Let us know!"
	}, context);

	on(helpLink, "click", function(event){
		if(!event.button && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey){
			event.preventDefault();
			helpDialog.set("content", domConstruct.create("iframe", {
				src: this.href,
				frameborder: "0",
				style: "width: 47em; height: 500px; border: 0 none"
			}));
			helpDialog.show();
		}
	});

	var privateOn = false, inheritedOn = true, extensionOn = true;

	//	hide the private members.
	adjustLists();

	//	make the summary sections collapsible.
	query("h2.jsdoc-summary-heading", this.domNode).forEach(function(item){
		on(item, "click", function(e){
			var d = e.target.nextSibling;
			while(d.nodeType != 1 && d.nextSibling){ d = d.nextSibling; }
			if(d){
				var dsp = domStyle.get(d, "display");
				domStyle.set(d, "display", (dsp=="none"?"":"none"));
				query("span.jsdoc-summary-toggle", e.target).forEach(function(item){
					domClass.toggle(item, "closed", dsp=="none");
				});
			}
		});

		query("span.jsdoc-summary-toggle", item).addClass("closed");

		//	probably should replace this with next or something.
		var d = item.nextSibling;
		while(d.nodeType != 1 && d.nextSibling){ d = d.nextSibling; }
		if(d){
			domStyle.set(d, "display", "none");
		}
	});

	//	set the title
	var w = registry.byId("content").selectedChildWidget;
	document.title = w.title + " - " + (siteName || "The Dojo Toolkit");

	//	set the content of the printBlock.
	dom.byId("printBlock").innerHTML = w.domNode.innerHTML;
}