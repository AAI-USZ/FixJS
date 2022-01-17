function () {
		if (window.chrome) {
			return new ChromeTabWatcher;
		}
		else if (window.opera) {
			return new OperaTabWatcher;
		}
		else if (window.jetpack) {
			return new JetpackTabWatcher;
		}
		return new TabWatcher;
	}