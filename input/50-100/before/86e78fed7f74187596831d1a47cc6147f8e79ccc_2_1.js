function getPinState() {
		var state = {};

		if (store.get('Aloha.FloatingMenu.pinned') === 'true') {
			return {
				top: parseInt(store.get('Aloha.FloatingMenu.top'), 10),
				left: parseInt(store.get('Aloha.FloatingMenu.left'), 10),
				isPinned: true
			};
		}

		return {
			top: null,
			left: null,
			isPinned: false
		};
	}