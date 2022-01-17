function parseView(view,dir,manifest) {
	// validate parameters
	if (!view) { U.die('Undefined view passed to parseView()'); }
	if (!dir) { U.die('Failed to parse view "' + view + '", no directory given'); }

	var basename = path.basename(view, '.'+CONST.FILE_EXT.VIEW);
		dirname = path.dirname(view),
		viewName = basename,
		viewId = basename,
		template = {
			viewCode: '',
			controllerCode: '',
			onCreate: '' 
		},
		state = { parent: {} },
		files = {};

	// create a list of file paths
	_.each(['VIEW','STYLE','CONTROLLER'], function(fileType) {
		var tmp = path.join(dir,CONST.DIR[fileType]);
		if (dirname) { tmp = path.join(tmp,dirname); }
		files[fileType] = path.join(tmp,viewName+'.'+CONST.FILE_EXT[fileType]);
	});
	files.COMPONENT = path.join(compileConfig.dir.resourcesAlloy,CONST.DIR.COMPONENT);
	if (dirname) { files.COMPONENT = path.join(files.COMPONENT,dirname); }
	files.COMPONENT = path.join(files.COMPONENT,viewName+'.js');

	// validate view
	if (!path.existsSync(files.VIEW)) {
		logger.warn('No ' + CONST.FILE_EXT.VIEW + ' view file found for view ' + files.VIEW);
		return;
	}

	// Load the style and update the state
	try {
		state.styles = CU.loadAndSortStyle(files.STYLE);
	} catch (e) {
		logger.error(e.stack);
		U.die('Error processing style at "' + files.STYLE + '"');
	}

	// read and parse the view file
	var xml = fs.readFileSync(files.VIEW,'utf8');
	var doc = new DOMParser().parseFromString(xml);

	// Give our document the <Alloy> root element if it doesn't already have one
	if (doc.documentElement.nodeName !== 'Alloy') {
		var tmpDoc = new DOMParser().parseFromString('<Alloy></Alloy>');
		tmpDoc.documentElement.appendChild(doc.documentElement);
		doc = tmpDoc;
	}
	var docRoot = doc.documentElement;
	var id = viewId || doc.documentElement.getAttribute('id') || viewName;

	// handle component-level events
	_.each(['onCreate'], function(evt) {
		var attr = docRoot.getAttribute(evt);
		template[evt] = attr ? attr + '($);\n' : '';
	});

	// Generate Titanium code from the markup
	var rootChildren = U.XML.getElementsFromNodes(docRoot.childNodes);
	for (var i = 0, l = rootChildren.length; i < l; i++) {
		template.viewCode += CU.generateNode(
			rootChildren[i],
			state,
			i === 0 ? (viewId||viewName) : undefined,
			i === 0);
	}
	template.controllerCode += CU.loadController(files.CONTROLLER);

	// create component module code for this view/controller or widget
	var code = _.template(fs.readFileSync(path.join(compileConfig.dir.template, 'component.js'), 'utf8'), template);
	try {
		code = CU.processSourceCode(code, compileConfig.alloyConfig, files.COMPONENT);
	} catch (e) {
		logger.error(code);
		U.die(e);
	}

	// Write the view or widget to its runtime file
	if (manifest) {
		var widgetDir = dirname ? path.join(CONST.DIR.COMPONENT,dirname) : CONST.DIR.COMPONENT;
		wrench.mkdirSyncRecursive(path.join(compileConfig.dir.resourcesAlloy, CONST.DIR.WIDGET, manifest.id, widgetDir), 0777);
		CU.copyWidgetAssets(path.join(dir,CONST.DIR.ASSETS), compileConfig.dir.resources, manifest.id);
		fs.writeFileSync(path.join(compileConfig.dir.resourcesAlloy, CONST.DIR.WIDGET, manifest.id, widgetDir, viewName + '.js'), code);
	} else {
		wrench.mkdirSyncRecursive(path.dirname(files.COMPONENT), 0777);
		fs.writeFileSync(files.COMPONENT, code);
	}
}