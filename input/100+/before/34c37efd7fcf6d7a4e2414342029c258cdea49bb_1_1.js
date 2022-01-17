function (overlays, source, name, target) {
			ASSERT(isValid(overlays) && pertree.getRelid(overlays) === OVERLAYS);
			ASSERT(isValidPath(source) && isValidPath(target) && isPointerName(name));

			console.log("HUHU", '"' + source + '"', name, '"' + target + '"');
			console.log("-----------");
			console.log(overlays);
			
			var node = pertree.getChild(overlays, source);
			ASSERT(node && pertree.getProperty(node, name) === target);
			pertree.delProperty(node, name);
			if( pertree.isEmpty(node) ) {
				pertree.detach(node);
			}

			node = pertree.getChild(overlays, target);
			ASSERT(node);

			name = name + COLLSUFFIX;

			var array = pertree.getProperty(node, name);
			ASSERT(array && array.constructor === Array && array.length >= 1);

			if( array.length === 1 ) {
				ASSERT(array[0] === source);

				pertree.delProperty(node, name);
				if( pertree.isEmpty(node) ) {
					pertree.detach(node);
				}
			}
			else {
				var index = array.indexOf(source);
				ASSERT(index >= 0);

				array = array.slice(0);
				array.splice(index, 1);

				pertree.setProperty(node, name, array);
			}

			console.log("-----------");
			console.log(overlays);
			console.log("-----------");
		}