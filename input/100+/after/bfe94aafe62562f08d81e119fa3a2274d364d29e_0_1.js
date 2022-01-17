function(localOnly) {
		if (localOnly) {
			var found = -1,
				dfd = new Deferred(),
				children = this.parent.children;
			children.some(function(child) {
				if(child.getName()==this.getName()) {
					found = i;
				}				
			}, this);

			if (found == -1) {
				dfd.reject();
			} else {
				children.splice(found, 1);
				dojo.publish("/davinci/resource/resourceChanged", ["deleted", this]);
				dfd.accept();
			}
			return dfd;
		}
		return xhr.get({
			url: "cmd/deleteResource",
			handleAs: "text",
			content: {path: this.getPath()}
		});
	}