function finish(req, res, b, jsFiles){
				
					jsFiles = jsFiles || [];
					
					for(var i=0;i<jsFiles.length;++i){
						if(typeof(jsFiles[i]) !== 'string') _.errout('ERROR: jsFiles list contains non-string: ' + jsFiles[i]);
					}
				
					if(b === undefined){
						return;
					}
					
					b.hasJs = !!req.cookies.hasjs;
					b.urlPrefix = config.prefix || '';
				

					var content = '\n<script>\n';
					_.each(b, function(value, attr){
						content += 'var ' + attr + ' = '  + JSON.stringify(value) + ';\n';
					});
					content += '</script>\n';

					var extraJs = '';
					_.each(jsFiles, function(jsFile){
						_.assertString(jsFile);
						extraJs += '<script src="' + (jsFile.indexOf('://') === -1 ? b.urlPrefix : '') + jsFile + '"></script>\n';
					});

					var title =  b.title || pageDef.title || app.name;
					//console.log('TITLE OPTIONS: ' + b.title + ' ' + pageDef.title + ' ' + app.name);
					
					var parts = makeWrappingParts(app, local, pageDef, title, includeJs, includeCss, iconUrl);
		
					var html = parts.header + content + parts.javascript + extraJs + parts.footer;

					res.send(html, {'Cache-Control': 'no-cache, no-store'});
				}