function(files, dependencies, cssPackage){
		// put it somewhere ...
		// add to dependencies ...
		// seperate out css and js
		var jses = [],
			csses = [];
				
		// if even one file has compress: false, we can't compress the whole package at once
		var canCompressPackage = true;
		files.forEach(function(file){
			if(file.minify === false){
				canCompressPackage = false;
			}
		});
		if(!canCompressPackage){
			files.forEach(function(file){
				if(file.buildType == 'js'){
					var source = steal.build.js.clean(file.text);
					if(file.minify !== false){
						source = steal.build.js.minify(source);
					}
					file.text = source;
				}
			});
		}
		
		files.forEach(function(file){
			if ( file.packaged === false ) {

				steal.print('   not packaging ' + file.rootSrc);
				
				return;
			}
			
			// ignore
			if ( file.ignore ) {
				steal.print('   ignoring ' + file.rootSrc);
				return;
			}
			
			
			if(file.buildType == 'js'){
				jses.push(file)
			} else if(file.buildType == 'css'){
				csses.push(file)
			}
		})
		// add to dependencies
		if(csses.length && dependencies){
			dependencies[cssPackage] = csses.map(function(css){
				return css.rootSrc;
			})
		}
		
		// this now needs to handle css and such
		var loadingCalls = jses.map(function(file){
			return file.rootSrc;
		});
		
		//create the dependencies ...
		var dependencyCalls = [];
		for (var key in dependencies){
			dependencyCalls.push( 
				"steal({src: '"+key+"', waits: true, has: ['"+dependencies[key].join("','")+"']})"
			)
		}
		// make 'loading'
		var code = ["steal.has('"+loadingCalls.join("','")+"')"];
		// add dependencies
		code.push.apply(code, dependencyCalls);
		
		// add js code
		jses.forEach(function(file){
			code.push( file.text, "steal.executed('"+file.rootSrc+"')" );
		});
		
		var jsCode = code.join(";\n") + "\n";
		
		if(canCompressPackage){
			jsCode = steal.build.js.clean(jsCode);
			jsCode = steal.build.js.minify(jsCode);
		}
		
		var csspackage = steal.build.css.makePackage(csses, cssPackage);
		
		return {
			js: jsCode,
			css: csspackage && csspackage.code
		}
	}