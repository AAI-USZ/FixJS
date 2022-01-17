function (node) {
				var item = source.getItem(node.id);
				return item.data.dir || item.data.item.dir;
			}