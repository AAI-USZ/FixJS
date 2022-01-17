function(entityType, zOrder) {
			var obj = me.entityPool.newInstanceOf(entityType);
			if (obj) {
				api.add(obj, zOrder);
			}
		}