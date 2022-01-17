function(req, res){
	var query = req.query,
		builderOptions = {
			headerPath: '../libraries/header1.inc',
			footerPath: '../libraries/footer1.inc'
		},
		builder = null,
		buildResponse = null,
		requestedFunctions,
		requestedConstructorFns,
		namespace,
		minify,
		fileName = 'jessie',
		errors = [];

	/*
	 * There is a download param in the querystring as the user
	 * has submitted the form (but not necessarily)
	 */
	if(query['download']) {
		requestedFunctions = getRequestedFunctions(query);
		requestedConstructorFns = getRequestedConstructors(query);
		
		namespace = query['namespace'].trim();
		if(namespace && namespace.length > 0) {

			// The user has typed a namespace
			builderOptions.namespace = namespace;
			fileName = namespace;
		}

		minify = query['minify'];
		if(minify == 'on') {

			// The user has asked for a minified version
			builderOptions.minify = true;
		}

		builder = new JessieBuilder(functionSet, constructorFnSet, requestedFunctions, requestedConstructorFns, builderOptions);
		buildResponse = builder.build();

		if(buildResponse.errors) {
			errors = getErrorsInViewFriendlyFormat(buildResponse.errors);
			res.render('index.ejs', {
				functions: functionSet.getFunctions(),
				constructorFns: constructorFnSet.getConstructorFns(),
				errors: errors,
				query: query,
				md: md
			});
		} else {
			res.header('Content-Disposition', 'attachment; filename="'+fileName+'.js"');
			res.contentType('text/javascript');
			res.send(buildResponse.output);
		}
	
	/*
	 * The user has requested the page without a download querystring
	 * param, so we just show page
	 */
	} else {
		res.render('index.ejs', {
			functions: functionSet.getFunctions(),
			constructorFns: constructorFnSet.getConstructorFns(),
			query: query,
			errors: errors,
			md: md
		});
	}
}