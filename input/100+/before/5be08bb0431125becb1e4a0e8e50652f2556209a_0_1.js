function(options){
				
				// order files 
				apps.order(options);
				
				var sharing,
					// makes contains an hash of packageSrc to
					// the object that we will pass to steal.p.make
					// like:
					//  {
					//    package1 : {src: package1, needs: [shared1]}
					//  }
					// this is used so when the package is stolen,
					// it will load anything it needs before it
					makes = {},
					// mappings of packaged app name to packaging file
					// this is what overwrites the loading location for packages
					maps = {},
					// a list of shares, we go through the list twice
					// b/c it is easier to populate makes
					// once we have gone through each share.
					shares = [];
				
				
				
				
				s.print("Getting Packages");
				while(sharing = apps.getMostShared(options.files)){
					shares.push(sharing);
				};
				packages.flatten(shares, buildOptions.depth);
				
				
				s.print("\nMaking Packages");
				shares.forEach(function(sharing){
					// is it a 'end' package
					var isPackage = sharing.appNames.length == 1,
						packageName = appNamesToMake(sharing.appNames);
	
					// create package
					var pack = build.js.makePackage(sharing.files.map(function(f){
						return f.stealOpts;
					}), {}, packageName+".css"),
						hasCSS = pack.css,
						has = [];
					
					
					// 
					if(isPackage){
						s.print("  Package: "+packageName+ (hasCSS ? " js/css" : "" ) )
					} else {
						s.print("  Shared Package: "+packageName+ (hasCSS ? " js/css" : "" ))
					}
					
					sharing.files.forEach(function(f){
						s.print("  + "+f.stealOpts.rootSrc)
						if(f.stealOpts.buildType == 'js'){
							has.push(f.stealOpts.rootSrc+'')
						}
					})
					s.print(" ")
					
					s.URI(packageName+".js").save( filterCode(pack.js, 'js') );
					
					// make this steal instance
					makes[packageName+".js"] = {
						src: packageName+".js",
						needs :[],
						has : has
					}
					// if we have css
					if(hasCSS){
						// write
						// tell the js it needs this css
						makes[packageName+".js"].needs.push(packageName+".css")
						// make the css
						makes[packageName+".css"] = {
							src: packageName+".css",
							has: pack.css.srcs
						};
						s.URI(packageName+".css").save( filterCode(pack.css.code, 'css') );
						sharing.hasCSS = true;
					}
					
					
					// add to maps
					if(isPackage){
						// this should be the real file
						maps[sharing.appNames[0]+".js"] = packageName+".js";
					}
				})
				// handle depth
				
				
				
				shares.forEach(function(sharing){
					var isPackage = sharing.appNames.length == 1,
						sharePackageName = appNamesToMake(sharing.appNames);
					
					if(!isPackage){
						// add this as a needs to master
						sharing.appNames.forEach(function(appName){
							var packageName = appNamesToMake([appName])
							makes[packageName+".js"].needs
								.push(sharePackageName+".js")
							
							// add css
							if(sharing.hasCSS){
								makes[packageName+".js"].needs
									.push(sharePackageName+".css")
							}
							// also needs css!
							
						})
					}
				});
				// write production with makes
				// and maps
				
				// sort masterFiles
				s.print("Making "+to+"/production.js");
				
				var pack = build.js.makePackage(
					masterFiles.map(function(f){return f.stealOpts}),
					{}, to+"/production.css");
				// prepend maps and makes ...
				// make makes
				var makeCode = [],
					mapCode;
				for(name in makes) {
					makeCode.push("Resource.make(",
						s.toJSON(makes[name]),
						");")
				}
				mapCode = "steal.packages("+s.toJSON(maps)+");"
				s.URI(to+"/production.js").save( filterCode(mapCode+makeCode.join('\n')+"\n"+pack.js, 'js') );
				if(pack.css){
					s.print("       "+to+"/production.css");
					s.URI(to+"/production.css").save( filterCode(pack.css.code, 'css') );
				}
			}