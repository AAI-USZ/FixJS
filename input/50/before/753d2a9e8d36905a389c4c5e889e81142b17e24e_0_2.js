function(entityType, zOrder) {
			var obj = me.entityPool.newIstanceOf(entityType);
			if (obj) {
				api.add(obj, zOrder);
			}
		}