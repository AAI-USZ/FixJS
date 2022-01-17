function(perspectiveID) {
		Workbench.activePerspective = perspectiveID;
		Workbench._updateMainMenubar();

		var mainBody = dojo.byId('mainBody');
		if (!mainBody.tabs) {
			mainBody.tabs = [];
		}
		
		/* Large border container for the entire page */
		var mainBodyContainer = dijit.byId('mainBody');

		if (!mainBodyContainer) {
			mainBodyContainer = new BorderContainer({
					gutters: false,
					region: "center",
					design: 'sidebar'
				}, mainBody);
		}
		var perspective = Runtime.getExtension("davinci.perspective",perspectiveID);

		if (!perspective) {
			Runtime.handleError(dojo.string.substitute(webContent.perspectiveNotFound,[perspectiveID]));
		}

		perspective = dojo.clone(perspective);	// clone so views aren't added to original definition

		var extensions = Runtime.getExtensions("davinci.perspectiveExtension",
				function (extension) {
					return extension.targetID === perspectiveID;
				});
		dojo.forEach(extensions, function (extension) {
			// TODO: should check if view is already in perspective
			dojo.forEach(extension.views, function (view){ perspective.views.push(view); });
		});

		if (!mainBody.editorsStackContainer) {
			Workbench.editorsStackContainer = mainBody.editorsStackContainer =
				new StackContainer({
					region:'center',
					id: "editorsStackContainer",
					controllerWidget: "dijit.layout.StackController"
				});
		}
		// FIXME: THIS BYPASSES THE PLUGIN SYSTEM.
		// Hardcoding this for now. Need to work with Phil on how to turn change
		// welcome page logic into something that is defined by ve_plugin.js.
		mainBodyContainer.addChild(mainBody.editorsStackContainer);
		if (!mainBody.editorsWelcomePage) {
			Workbench.editorsWelcomePage = mainBody.editorsWelcomePage =
				new ContentPane({
					id: "editorsWelcomePage",
					href: "app/davinci/ve/resources/welcome_to_maqetta.html"
					/*
					content: "<div><span id='welcome_page_new_open_container'/></div>\n"+
						"<div id='welcome_page_content'>\n"+
						"<h1>Welcome to Maqetta!</h1>\n"+
						"<p>You can get started by using the menus at the top/right:</p>\n"+
						"<ul class='welcome_page_bullets'>\n"+
						"<li>Click on <img src='app/davinci/img/help_menu_image.png'/> for tutorials.</li>\n"+
						"<li>Click on <img src='app/davinci/img/new_menu_image.png'/> to start authoring a new file.</li>\n"+
						"<li>Click on <img src='app/davinci/img/open_menu_image.png'/> to open a file or theme editor.</li>\n"+
						"</ul>\n"+
						"</div>\n"
					*/
				});
		}
		mainBody.editorsStackContainer.addChild(mainBody.editorsWelcomePage);
		if (!mainBody.tabs.editors) {
			Workbench.editorTabs = mainBody.tabs.editors =
				new (Workbench.hideEditorTabs ? StackContainer : TabContainer)({
					id: "editors_container",
					controllerWidget: (Workbench.hideEditorTabs ? "dijit.layout.StackController" : "dijit.layout.TabController")
				});
//FIXME: need to add similar logic for shadow tabs? (DONE - injected further down)
//Research this.tablist (NOT YET DONE)
			Workbench.editorTabs.setTitle = function(editorContainer, title) { 
				editorContainer.attr('title', title);
				if(!Workbench.hideEditorTabs){
					this.tablist.pane2button[editorContainer.id].attr('label', title);
				}else{
					var editorId = editorContainer.id;
					var shadowId = editorIdToShadowId(editorId);
					var shadowTabContainer = dijit.byId("davinci_file_tabs");
					shadowTabContainer.tablist.pane2button[shadowId].attr('label', title);
				}
			};
			
			dojo.connect(mainBody.tabs.editors, "removeChild", this, Workbench._editorTabClosed);
		}
		mainBody.editorsStackContainer.addChild(mainBody.tabs.editors);
		mainBody.editorsStackContainer.selectChild(mainBody.editorsWelcomePage);
//FIXME: need to connect to shadow tabcontainer instead (DONE - lower down)
		dojo.connect(dijit.byId("editors_container"), "selectChild", function(child) {
			if(!Workbench._processingSelectChild){
				Workbench._processingSelectChild = true;
				var editorId = child.id;
				var shadowId = editorIdToShadowId(editorId);
				var shadowTab = dijit.byId(shadowId);
				var shadowTabContainer = dijit.byId("davinci_file_tabs");
				if(shadowTab && shadowTabContainer){
					shadowTabContainer.selectChild(shadowTab);
				}
				if (child.editor) {
					Workbench._switchEditor(child.editor);
				}
				Workbench._processingSelectChild = false;
			}
		});
		mainBodyContainer.startup();

		// Put the toolbar and the main window in a border container
		var appBorderContainer = dijit.byId('davinci_app');
		if (!appBorderContainer) {
			appBorderContainer = new BorderContainer({
				design: "headline",
				gutters: false,
				liveSplitters: false
			}, "davinci_app");
			
			var topBarPane = new ContentPane({
				region: "top",
				layoutPriority:1,
			}, "davinci_top_bar");
			
			var shadowTabContainer = Workbench.shadowTabs = new TabContainer({
				id:'davinci_file_tabs',
				closable: true,
				region: "top",
				layoutPriority:2
			});
			Workbench.shadowTabs.setTitle = function(tab, title) { 
				tab.attr('title', title);
				this.tablist.pane2button[tab.id].attr('label', title);
			};
			dojo.connect(shadowTabContainer, "selectChild", function(child) {
				var shadowId = child.id;
				var editorId = shadowIdToEditorId(shadowId);
				var editorContainer = dijit.byId(editorId);
				var editorsContainer = dijit.byId("editors_container");
				if (editorsContainer && editorContainer && editorContainer.editor) {
					// This is trigger (indirectly) the selectChild callback function on 
					// the editors_container widget, which will trigger Workbench._switchEditor
					editorsContainer.selectChild(editorContainer);
				}
			});
			dojo.connect(shadowTabContainer, "removeChild", this, Workbench._shadowTabClosed);
			var toolbarPane = new ContentPane({
				id:'davinci_toolbar_pane',
				region: "top",
				layoutPriority:3,
				content:'<div id="davinci_toolbar_container"></div>'
			});
//FIXME: shadow fixes - delete this
/*
			var tempCP = new ContentPane({
				title:'file1.html',
				content:'hello there'
			});
			shadowTabContainer.addChild(tempCP);
*/
		
			appBorderContainer.addChild(topBarPane);
			appBorderContainer.addChild(shadowTabContainer);
			appBorderContainer.addChild(toolbarPane);
			appBorderContainer.addChild(mainBodyContainer);
			appBorderContainer.layout();	
			appBorderContainer.startup();
			Workbench._orginalOnResize = window.onresize;
			window.onresize = Workbench.onResize; //alert("All done");}
			dojo.connect(mainBodyContainer, 'onMouseUp', this, 'onResize');
		}
		
//FIXME: Temporary
var floatingPropertiesPalette = dojo.create('div', 
		{ id:'floatingPropertiesPalette',
			'class':'floatingPropertiesPalette',
			style:'position:absolute; z-index:100; width:300px; height:500px; left:800px; top:200px;border:1px solid black;background:white;' },
		document.body);
new Moveable(floatingPropertiesPalette);
		
		/* close all of the old views */
		for (var position in mainBody.tabs.perspective) {
			var view = mainBody.tabs.perspective[position];
			if(!view) {
				continue;
			}
			dojo.forEach(view.getChildren(), function(child) {
				view.removeChild(child);
				if (position != 'left' && position != 'right') {
					child.destroyRecursive(false);
				}
			});
			view.destroyRecursive(false);
			delete mainBody.tabs.perspective[position];
		}

		dojo.forEach(perspective.views, function(view) {
			Workbench.showView(view.viewID, false);
		}, this);

		// kludge to workaround problem where tabs are sometimes cutoff/shifted to the left in Chrome for Mac
		// would be nice if we had a workbench onload event that we could attach this to instead of relying on a timeout
		setTimeout(function() {
			appBorderContainer.resize();
		}	},
