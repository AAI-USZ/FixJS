function (storage) {

		var pertree = new PerTree(storage);

		var isValid = pertree.isValid;

		var getAttributeNames = function (node) {
			return Object.keys(pertree.getProperty(node, ATTRIBUTES));
		};

		var getAttribute = function (node, name) {
			return pertree.getProperty2(node, ATTRIBUTES, name);
		};

		var delAttribute = function (node, name) {
			pertree.delProperty2(node, ATTRIBUTES, name);
		};

		var setAttribute = function (node, name, value) {
			pertree.setProperty2(node, ATTRIBUTES, name, value);
		};

		var getRegistry = function (node, name) {
			return pertree.getProperty2(node, REGISTRY, name);
		};

		var delRegistry = function (node, name) {
			pertree.delProperty2(node, REGISTRY, name);
		};

		var setRegistry = function (node, name, value) {
			pertree.setProperty2(node, REGISTRY, name, value);
		};

		var insertOverlay = function (overlays, source, name, target) {
			ASSERT(isValid(overlays) && pertree.getRelid(overlays) === OVERLAYS);
			ASSERT(isValidPath(source) && isValidPath(target) && isPointerName(name));

			var node = pertree.getChild(overlays, source);
			if( !node ) {
				node = pertree.createChild(overlays, source);
			}

			ASSERT(pertree.getProperty(node, name) === undefined);
			pertree.setProperty(node, name, target);

			node = pertree.getChild(overlays, target);
			if( !node ) {
				node = pertree.createChild(overlays, target);
			}

			name = name + COLLSUFFIX;

			var array = pertree.getProperty(node, name);
			if( array ) {
				ASSERT(array.indexOf(source) < 0);

				array = array.slice(0);
				array.push(source);
			}
			else {
				array = [ source ];
			}

			pertree.setProperty(node, name, array);
		};

		var removeOverlay = function (overlays, source, name, target) {
			ASSERT(isValid(overlays) && pertree.getRelid(overlays) === OVERLAYS);
			ASSERT(isValidPath(source) && isValidPath(target) && isPointerName(name));

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
		};

		var createNode = function (parent) {
			ASSERT(!parent || isValid(parent));

			var node = pertree.createRoot();
			pertree.createChild(node, ATTRIBUTES);
			pertree.createChild(node, REGISTRY);
			pertree.createChild(node, OVERLAYS);

			if( parent ) {
				var relid = createRelid(parent.data);
				pertree.setParent(node, parent, relid);
			}

			return node;
		};

		var deleteNode = function (node) {
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
		};

		var copyNode = function (node, parent) {
			ASSERT(node && parent);

			var relid = createRelid(parent.data);
			pertree.copy(node, parent, relid);
		};

		var persist = function (root, callback) {
			ASSERT(root && callback);
			ASSERT(pertree.getParent(root) === null);

			pertree.persist(root, callback);
		};

		var getChildrenRelids = function (node) {
			ASSERT(isValid(node));

			var relids = [];
			for( var relid in node.data ) {
				if( isValidRelid(relid) ) {
					relids.push(relid);
				}
			}

			return relids;
		};

		var loadChildren = function (node, callback) {
			ASSERT(node && callback);

			var children = new UTIL.AsyncArray(callback);

			for( var relid in node.data ) {
				if( isValidRelid(relid) ) {
					pertree.loadChild(node, relid, children.add());
				}
			}

			children.start();
		};

		var EMPTY_STRING = "";

		var getPointerNames = function (node) {
			ASSERT(node);

			var source = EMPTY_STRING;
			var names = [];

			do {
				var child = pertree.getProperty2(node, OVERLAYS, source);
				if( child ) {
					for( var name in child ) {
						ASSERT(names.indexOf(name) === -1);
						if( isPointerName(name) ) {
							names.push(name);
						}
					}
				}

				if( source === EMPTY_STRING ) {
					source = pertree.getRelid(node);
				}
				else {
					source = pertree.getRelid(node) + "/" + source;
				}

				node = pertree.getParent(node);
			} while( node );

			return names;
		};

		var getPointerPath = function (node, name) {
			ASSERT(node && name);

			var source = EMPTY_STRING;
			var target = null;

			do {
				var child = pertree.getChild(node, OVERLAYS);
				ASSERT(child);

				child = pertree.getChild(child, source);
				if( child ) {
					target = pertree.getProperty(child, name);
					if( target ) {
						break;
					}
				}

				if( source === EMPTY_STRING ) {
					source = pertree.getRelid(node);
				}
				else {
					source = pertree.getRelid(node) + "/" + source;
				}

				node = pertree.getParent(node);
			} while( node );

			if( target ) {
				target = pertree.joinStringPaths(pertree.getStringPath(node), target);
			}

			return target;
		};

		var loadPointer = function (node, name, callback) {
			ASSERT(node && name && callback);

			var source = EMPTY_STRING;
			var target;

			do {
				var child = pertree.getChild(node, OVERLAYS);
				ASSERT(child);

				child = pertree.getChild(child, source);
				if( child ) {
					target = pertree.getProperty(child, name);
					if( target ) {
						break;
					}
				}

				if( source === EMPTY_STRING ) {
					source = pertree.getRelid(node);
				}
				else {
					source = pertree.getRelid(node) + "/" + source;
				}

				node = pertree.getParent(node);
			} while( node );

			if( target ) {
				ASSERT(typeof target === "string");
				pertree.loadByPath(node, target, callback);
			}
			else {
				callback(null, null);
			}
		};

		var loadCollection = function (node, name, callback) {
			ASSERT(node && name && callback);

			name += COLLSUFFIX;

			var result = new UTIL.AsyncArray(callback);
			var target = EMPTY_STRING;

			do {
				var child = pertree.getChild(node, OVERLAYS);

				child = pertree.getChild(child, target);
				if( child ) {
					var sources = pertree.getProperty(target, name);
					if( sources ) {
						ASSERT(sources.constructor === Array);
						ASSERT(sources.length >= 1);

						for( var i = 0; i < sources.length; ++i ) {
							pertree.loadByPath(node, sources[i], result.add());
						}
					}
				}

				if( target === EMPTY_STRING ) {
					target = pertree.getRelid(node);
				}
				else {
					target = pertree.getRelid(node) + "/" + target;
				}

				node = pertree.getParent(node);
			} while( node );

			result.start();
		};

		var deletePointer = function (node, name) {
			ASSERT(node && name);

			var source = EMPTY_STRING;

			do {
				var overlays = pertree.getChild(node, OVERLAYS);
				ASSERT(overlays);

				var target = pertree.getProperty2(overlays, source, name);
				if( target ) {
					removeOverlay(overlays, source, name, target);
					return true;
				}

				if( source === EMPTY_STRING ) {
					source = pertree.getRelid(node);
				}
				else {
					source = pertree.getRelid(node) + "/" + source;
				}

				node = pertree.getParent(node);
			} while( node );

			return false;
		};

		var setPointer = function (node, name, target) {
			ASSERT(node && name && target);

			deletePointer(node, name);

			var ancestor = pertree.getCommonAncestor(node, target);
			ASSERT(ancestor[0] === ancestor[1]);

			var overlays = pertree.getChild(ancestor[0], OVERLAYS);
			var sourcePath = pertree.getStringPath(node, ancestor[0]);
			var targetPath = pertree.getStringPath(target, ancestor[1]);

			insertOverlay(overlays, sourcePath, name, targetPath);
		};

		return {
			getKey: pertree.getKey,
			loadRoot: pertree.loadRoot,
			loadChildren: loadChildren,
			getChildrenRelids: getChildrenRelids,
			loadChild: pertree.loadChild,
			getParent: pertree.getParent,
			getRoot: pertree.getRoot,
			getLevel: pertree.getLevel,
			getStringPath: pertree.getStringPath,
			createNode: createNode,
			deleteNode: deleteNode,
			copyNode: copyNode,
			getAttributeNames: getAttributeNames,
			getAttribute: getAttribute,
			setAttribute: setAttribute,
			delAttribute: delAttribute,
			getRegistry: getRegistry,
			setRegistry: setRegistry,
			delRegistry: delRegistry,
			persist: persist,
			getPointerNames: getPointerNames,
			getPointerPath: getPointerPath,
			loadPointer: loadPointer,
			deletePointer: deletePointer,
			setPointer: setPointer,
			loadCollection: loadCollection,
			dumpTree: pertree.dumpTree
		};
	}