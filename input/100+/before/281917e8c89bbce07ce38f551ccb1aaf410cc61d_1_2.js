function parseView(viewName,dir,viewid,manifest) {
	var template = {
		viewCode: '',
		controllerCode: '',
		lifecycle: '',
		CFG: compileConfig.runtimeConfig 
	};
	var state = { parent: {} };
	var vd = dir ? path.join(dir,'views') : compileConfig.dir.views; 
	var sd = dir ? path.join(dir,'styles') : compileConfig.dir.styles; 

	var viewFile = path.join(vd,viewName+".xml");
	if (!path.existsSync(viewFile)) {
		logger.warn('No XML view file found for view ' + viewFile);
		return;
	}

	var styleFile = path.join(sd,viewName+".json");
	var styles = CU.loadStyle(styleFile);
	state.styles = styles;

	var xml = fs.readFileSync(viewFile,'utf8');
	var doc = new DOMParser().parseFromString(xml);

	// Give our document the <Alloy> root element if it doesn't already have one
	if (doc.documentElement.nodeName !== 'Alloy') {
		var tmpDoc = new DOMParser().parseFromString('<Alloy></Alloy>');
		tmpDoc.documentElement.appendChild(doc.documentElement);
		doc = tmpDoc;
	}
	var docRoot = doc.documentElement;
	var id = viewid || doc.documentElement.getAttribute('id') || viewName;

	// TODO: Can we move this out of the parseView() call?
	if (viewName === 'index') {
		template.viewCode += findAndLoadModels();
	}

	// Generate Titanium code from the markup
	for (var i = 0, l = docRoot.childNodes.length; i < l; i++) {
		template.viewCode += CU.generateNode(
			docRoot.childNodes.item(i),
			state,
			viewid||viewname,
			true);
	}
	template.controllerCode += generateController(viewName,dir,id);

	// create commonjs module for this view/controller
	var code = _.template(fs.readFileSync(path.join(compileConfig.dir.template, 'component.js'), 'utf8'), template);
	code = U.processSourceCode(code, compileConfig.alloyConfig);
	if (manifest) {
		wrench.mkdirSyncRecursive(path.join(compileConfig.dir.resourcesAlloy, 'widgets', manifest.id, 'components'), 0777);
		CU.copyWidgetAssets(path.join(dir,'assets'), compileConfig.dir.resources, manifest.id);
		fs.writeFileSync(path.join(compileConfig.dir.resourcesAlloy, 'widgets', manifest.id, 'components', viewName + '.js'), code);
	} else {
		fs.writeFileSync(path.join(compileConfig.dir.resourcesAlloy, 'components', viewName + '.js'), code);
	}
}