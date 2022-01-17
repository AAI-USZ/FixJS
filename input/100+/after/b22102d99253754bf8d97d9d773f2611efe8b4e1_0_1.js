function() {

					var loadDf = getDeferred();

					var loadDfFailCallback = function() {

						loadDf.reject(this.url);

					};



					if (parallel) {

						// 必ず非同期として処理されるようsetTimeout()で強制的に非同期にする

						promises.push(asyncFunc());



						$.each(resources, function() {

							var url = toAbsoluteUrl(this);



							if (!force && (url in addedJS || url in loadedUrl)) {

								return true;

							}



							promises.push(getScriptString(url, async, cache));

							loadedUrl[url] = url;

						});



						h5.async.when(promises).then(function(text, status, xhr) {

							if (promises.length === 1) {

								scriptData.push(text);

							} else {

								$.each(h5.u.obj.argsToArray(arguments), function(i, e) {

									scriptData.push(e[0]); // e[0] = responseText

								});

							}



							loadDf.resolve();

						}, loadDfFailCallback);

					} else {

						var secDf = getDeferred().resolve();



						// 必ず非同期として処理されるようsetTimeout()で強制的に非同期にする

						secDf = secDf.pipe(asyncFunc);



						$.each(resources, function() {

							var url = toAbsoluteUrl(this);



							secDf = secDf.pipe(function() {

								var df = getDeferred();



								if (!force && (url in addedJS || url in loadedUrl)) {

									df.resolve();

								} else {

									getScriptString(url, async, cache).then(

											function(text, status, xhr) {

												scriptData.push(text);

												loadedUrl[url] = url;

												df.resolve();

											}, function() {

												df.reject(this.url);

											});

								}



								return df.promise();

							}, loadDfFailCallback);

						});



						secDf.pipe(function() {

							loadDf.resolve();

						}, loadDfFailCallback);

					}



					return loadDf.promise();

				}