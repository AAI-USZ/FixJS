function(options) {
			
			steal.print("Making packages")
			
			//add an order number so we can sort them nicely
			apps.order(options);

			// will be set to the biggest group
			var sharing,
				/*
				 * Packages that an app should have
				 * {
				 *   'cookbook' : ['packages/0.js']
				 * } 
				 */
				appsPackages = {},
				/*
				 * Files a package has
				 * {
				 *   'packages/0.js' : ['jquery/jquery.js']
				 * }
				 * this is used to mark all of these
				 * things as loading, so steal doesn't try to load them
				 * b/c the package is loading
				 */
				packagesFiles = {};

			// make an array for each appName that will contain the packages
			// it needs to load
			options.appFiles.forEach(function(file){
				appsPackages[file.appNames[0]] = [];
			})

			//while there are files left to be packaged, get the most shared and largest package
			while ((sharing = apps.getMostShared(options.files))) {
				
				steal.print('\npackaging shared by ' + sharing.appNames.join(", "))

				
				var appsName = sharing.appNames[0],
				//  the name of the file we are making.  
				//    If there is only one app it's an app's production.js
				//    If there are multiple apps, it's a package
					packageName = sharing.appNames.length == 1 ? 
									appsName + "/production" : 
									"packages/" + sharing.appNames.join('-')
									  .replace(/\//g,'_') 
				
				// if there's multiple apps (it's a package), add this to appsPackages for each app
				if( sharing.appNames.length > 1) {
					sharing.appNames.forEach(function(appName){
						appsPackages[appName].push(packageName+".js") // we might need to do this 
						// if there is css
					})
				}
				
				
				
				// add the files to this package
				packagesFiles[packageName+".js"] =[];
				
				// what we will sent to js.makePackage
				// the files that will actually get packaged
				var filesForPackaging = []; 
				
				sharing.files.forEach(function(file){
					// add the files to the packagesFiles
					packagesFiles[packageName+".js"].push(file.stealOpts.rootSrc);
					
					filesForPackaging.push(file.stealOpts)
					steal.print("  " + file.order + ":" + file.stealOpts.rootSrc);
				});
				
				// create dependencies object
				var dependencies = {};
				// only add dependencies for the 'root' objects
				if( sharing.appNames.length == 1) {
					// for the packages for this app
					appsPackages[appsName].forEach(function(packageName){
						// add this as a dependency
						dependencies[packageName] = packagesFiles[packageName].slice(0)
					})
				}
				
				//the source of the package
				//
				var pack = steal.build.js.makePackage(filesForPackaging, dependencies,packageName+ ".css")

				//save the file
				steal.print("saving " + packageName+".js");
				steal.File(packageName+".js").save( pack.js );

				if(pack.css){
					steal.print("saving " + packageName+".css");
					steal.File(packageName+".css").save( pack.css.code );
					// I need to tell things that 
					// have this dependency, that this dependency needs
					// me
				}
				//packageCount++;
			}

		}