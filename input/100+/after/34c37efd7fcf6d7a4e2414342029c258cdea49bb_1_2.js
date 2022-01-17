function (overlays, prefix) {
			ASSERT(isValid(overlays) && typeof prefix === "string");

			var list = [];

			var paths = pertree.getChildrenRelids(overlays);
			for( var i = 0; i < paths.length; ++i ) {
				var path = paths[i];
				if( path.substr(0, prefix.length) === prefix ) {
					var node = pertree.getChild(overlays, path);
					var names = pertree.getChildrenRelids(node);
					for( var j = 0; j < names.length; ++j ) {
						var name = names[j];
						if( isPointerName(name) ) {
							list.push({
								s: path,
								n: name,
								t: pertree.getProperty(node, name),
								p: true
							});
						}
						else {
							var array = pertree.getProperty(node, name);
							ASSERT(array && array.constructor === Array);
							name = name.slice(0, -COLLSUFFIX.length);
							for( var k = 0; k < array.length; ++k ) {
								list.push({
									s: array[k],
									n: name,
									t: path,
									p: false
								});
							}
						}
					}
				}
			}

			return list;
		}