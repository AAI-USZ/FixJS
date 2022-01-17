function(uri)
										{
											LOADER.loadBundleCode(uri).then(function(code)
											{
												callback(code);
											});
										}