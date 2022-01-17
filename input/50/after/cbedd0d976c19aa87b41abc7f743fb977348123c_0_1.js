function(err, uri)
										{
											if (err)
											{
												throw err;
											}
											LOADER.loadBundleCode(uri, function(err, code)
											{
												if (err)
												{
													throw err;
												}
												callback(code);
											});
										}