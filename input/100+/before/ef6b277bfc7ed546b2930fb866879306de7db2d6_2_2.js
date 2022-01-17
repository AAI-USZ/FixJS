function(relFilename, info) {
		//Save template-specific information
		var pInc = info.inc,
			pBase = info.base,
			pRel = info.rel,
			pFilename = info.filename,
			pLine = info.line,
			pCol = info.col,
			pSource = info.source,
			pLocals = info.locals;
		info.inc = true;
		//Append .blade for filenames without an extension
		var ext = relFilename.split("/");
		ext = ext[ext.length-1].indexOf(".");
		if(ext < 0)
			relFilename += ".blade";
		//If exposing locals, the included view gets its own set of locals
		if(arguments.length > 2)
		{
			info.locals = {};
			for(var i = 2; i < arguments.length; i += 2)
				info.locals[arguments[i]] = arguments[i+1];
		}
		//Now load the template and render it
		var sync = runtime.loadTemplate(info.base, info.rel + "/" + relFilename,
			runtime.compileOptions, function(err, tmpl) {
				if(err) throw err;
				tmpl(info.locals, function(err, html) {
					//This is run after the template has been rendered
					if(err) throw err;
					//Now, restore template-specific information
					info.inc = pInc;
					info.base = pBase;
					info.rel = pRel;
					info.filename = pFilename;
					info.line = pLine;
					info.col = pCol;
					info.source = pSource;
					info.locals = pLocals;
				}, info);
		});
		if(!sync) throw new Error("Included file [" + info.rel + "/" + relFilename +
			"] could not be loaded synchronously!");
	}