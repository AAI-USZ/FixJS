function(localOnly) {
		if (localOnly) {
			var dfd = new Deferred(),
				name = this.getName(),
				found = this.parent.children.some(function(child, i, children) {
					if(child.getName() == name) {
						children.splice(i, 1);
						return true;
					}				
				});

			if (found) {
				dojo.publish("/davinci/resource/resourceChanged", ["deleted", this]);
				dfd.resolve();
			} else {
				dfd.reject();
			}
			return dfd;
		}

		return xhr.get({
			url: "cmd/deleteResource",
			handleAs: "text",
			content: {path: this.getPath()}
		});
	}