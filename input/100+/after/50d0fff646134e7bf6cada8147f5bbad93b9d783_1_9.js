function (node, name, target) {
			ASSERT(isValid(node) && typeof name === "string" && (!target || isValid(target)));

			deletePointer(node, name);

			if( target ) {
				var ancestor = pertree.getCommonAncestor(node, target);
				ASSERT(ancestor[0] === ancestor[1]);

				var overlays = pertree.getChild(ancestor[0], OVERLAYS);
				var sourcePath = pertree.getStringPath(node, ancestor[0]);
				var targetPath = pertree.getStringPath(target, ancestor[1]);

				overlayInsert(overlays, sourcePath, name, targetPath);
			}
		}