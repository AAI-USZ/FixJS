function unstorePinPosition() {
		store.del('Aloha.FloatingMenu.pinned');
		store.del('Aloha.FloatingMenu.top');
		store.del('Aloha.FloatingMenu.left');
	}