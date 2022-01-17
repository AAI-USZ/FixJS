function success(result, status, responseHeaders) {
					if (status === 304) {
						F5.unpackPackage(pkg, cachedResult.result, function () {
							cb(true);											
						});	
					} else if (status === 200) {
						if (cache) {
							var packageListKey = F5.appPkg + '_packages';
							var pkgList = localStorage.packageList ? JSON.parse(localStorage[packageListKey]) : [];
							if (pkgList.indexOf(pkg) === -1) {
								pkgList.push(pkg);
							}
							localStorage[packageListKey] = JSON.stringify(pkgList);
							localStorage[pkg] = JSON.stringify({result: result, etag: responseHeaders['ETag']});
						}										
						F5.unpackPackage(pkg, result, function () {
							cb(true);							
						});
					} else {
						cb(false);
						console.log('error importing package: ' + pkg + ' status: ' + status + ' result: ' + result);
					}									
				}