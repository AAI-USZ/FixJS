function(inKind) {
		return this.presentProperties(this.showInherited ? inKind.allProperties : inKind.properties, inKind)
	}