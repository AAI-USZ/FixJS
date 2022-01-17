function unstorePinPosition() {
		amplifyStore.store('Aloha.FloatingMenu.pinned', null);
		amplifyStore.store('Aloha.FloatingMenu.top', null);
		amplifyStore.store('Aloha.FloatingMenu.left', null);
	}