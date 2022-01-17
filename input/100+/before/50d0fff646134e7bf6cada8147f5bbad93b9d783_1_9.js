function (node, name, target) {
			ASSERT(node && name && target);

			deletePointer(node, name);

			var ancestor = pertree.getCommonAncestor(node, target);
			ASSERT(ancestor[0] === ancestor[1]);

			var overlays = pertree.getChild(ancestor[0], OVERLAYS);
			var sourcePath = pertree.getStringPath(node, ancestor[0]);
			var targetPath = pertree.getStringPath(target, ancestor[1]);

			insertOverlay(overlays, sourcePath, name, targetPath);
		}