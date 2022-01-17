function(dependencies, unknownDependencies) {
					clearTimeout(timer);
					delete blade.cb[filename];
					st.parentNode.removeChild(st);
					//Load all dependencies, too
					if(dependencies.length > 0)
					{
						var done = 0;
						for(var i = 0; i < dependencies.length; i++)
							runtime.loadTemplate(baseDir, dependencies[i], compileOptions, function(err, tmpl) {
								if(err) throw err;
								if(++done == dependencies.length)
									callCallbacks(tmp.cb);
							});
					}
					else
						callCallbacks(tmp.cb);
				}