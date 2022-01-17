function (data) {
							
							// pull out stylesheet references. these should be done through the manifest
							data = data.replace(/<link.*stylesheet[^>]*>/g, '');
							data = data.replace(/<meta.*viewport[^>]*>/g, '');
							
							var fragments = data.split(/(>)/);
							async.map(fragments, function (fragment, cb) {								
								if (bool(query.inline)) {
									var matches = imgSrcRegExp.exec(fragment);// inline styles? || cssURLRegExp.exec(fragment);
									if (matches && matches.length > 1) {
										inlineData(pkg, resolveURL(base, matches[1]), cb, function (data) {
											cb(null, fragment.replace(matches[1], data));																					
										});										
									} else {
										cb(null, fragment);										
									}
								} else {
									// this shouldn't be needed
//									cb(null, fragment.replace(/(<img.*[\'\"]+)(.*)([\'\"]+)/, '$1/' + 
//																		packageUrl(pkg) + '$2$3'));	
									cb(null, fragment);
								}
							}, function (err, results) {
								elementsDiv.innerHTML = results.join('');						
								elementsDiv.setAttribute('f5id', file);				
								templatesEl.appendChild(elementsDiv);				
								cb();				
							});
						}