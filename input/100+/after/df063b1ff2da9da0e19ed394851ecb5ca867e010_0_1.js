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

		return {
			data: {
				title: obj.name,
				attr: {'data-repo-obj': obj.uid},
				icon: icon
			},
			attr: obj.type ? {rel: obj.type} : undefined,
			state: (obj.hasMoreItems || 'folder' === obj.baseType)
				? 'closed'
				: null,
			resource: obj
		};
	}