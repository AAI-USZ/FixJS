function(stl, text, i){
				// print("> ",stl.rootSrc)
				if(stl.buildType === "fn") {
					fns[stl.rootSrc] = true;
				}
				else if(fns[stl.rootSrc] && stl.buildType === "js"){ // if its a js type and we already had a function, ignore it
					return;
				}
				if ((opts.standAlone && ( ""+stl.rootSrc ) === plugin )
					|| (!opts.standAlone && !inExclude(stl))) {
				
					var content = s.build.pluginify.content(stl, opts, text);
					if (content) {
						s.print("  > " + stl.rootSrc)
						out.push(s.build.js.clean(content));
					}
				}
				else {
					s.print("  Ignoring " + stl.rootSrc)
				}
			}