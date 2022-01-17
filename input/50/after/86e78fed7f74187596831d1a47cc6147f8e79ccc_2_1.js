function storePinPosition(offset) {
		amplifyStore.store('Aloha.FloatingMenu.pinned', 'true');
		amplifyStore.store('Aloha.FloatingMenu.top', offset.top);
		amplifyStore.store('Aloha.FloatingMenu.left', offset.left);
	}