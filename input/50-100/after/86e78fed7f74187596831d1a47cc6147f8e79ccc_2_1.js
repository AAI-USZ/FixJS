function getPinState() {
		var state = {};

		if (amplifyStore.store('Aloha.FloatingMenu.pinned') === 'true') {
			return {
				top: parseInt(amplifyStore.store('Aloha.FloatingMenu.top'), 10),
				left: parseInt(amplifyStore.store('Aloha.FloatingMenu.left'), 10),
				isPinned: true
			};
		}

		return {
			top: null,
			left: null,
			isPinned: false
		};
	}