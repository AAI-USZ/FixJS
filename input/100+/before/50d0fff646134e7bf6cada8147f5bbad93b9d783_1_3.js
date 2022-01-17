function (node) {
			ASSERT(isValid(node));

			var parent = pertree.getParent(node);
			var prefix = pertree.getRelid(node);
			ASSERT(parent !== null);

			pertree.delParent(node);

			while( parent ) {
				var overlays = pertree.getChild(parent, OVERLAYS);

				var list = [];
				
				var paths = pertree.getChildrenRelid(overlays);
				for(var i = 0; i < paths.length; ++i) {
					var path = paths[i];
					if( path.substr(0, prefix.length) === prefix ) {
						node = pertree.getChild(overlays, path);
						var names = pertree.getChildrenRelid(node);
						for(var j = 0; j < names.length; ++j) {
							var name = names[j];
							if( isPointerName(name) ) {
								list.push({
									s: path,
									n: name,
									t: pertree.getProperty(node, name)
								});
							}
							else {
								var array = pertree.getProperty(node, name);
								ASSERT(array && array.constructor === Array);
								name = name.substring(0, -COLLSUFFIX.length);
								for(var k = 0; k < array.length; ++k) {
									list.push({
										s: array[k],
										n: name,
										t: path
									});
								}
							}
						}
					}
				}

				for(i = 0; i < list.length; ++i) {
					paths = list[i];
					removeOverlay(overlays, paths.s, paths.n, paths.t);
				}
				
				prefix = pertree.getRelid(parent) + "/" + prefix;
				parent = parent.getParent(parent);
			}
		}