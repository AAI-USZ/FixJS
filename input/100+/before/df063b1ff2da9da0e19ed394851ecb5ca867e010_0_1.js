function processRepoObject(obj) {
		var icon;
		switch (obj.baseType) {
		case 'folder':
			icon = 'folder';
			break;
		case 'document':
			icon = 'document';
			break;
		}

		var attr;
		if (obj.type) {
			attr = {rel: obj.type};
		}

		return {
			data: {
				title: obj.name,
				attr: {'data-repo-obj': obj.uid},
				icon: icon
			},
			attr: attr,
			state: (obj.hasMoreItems || 'folder' === obj.baseType)
				? 'closed'
				: null,
			resource: obj
		};
	}