function(localOnly) {
		var response="OK";
		if (!localOnly) {
			response = davinci.Runtime.serverJSONRequest({
				url: "cmd/deleteResource", handleAs: "text",
				content: {path: this.getPath()}, sync: true
			});
		}
		if (response == "OK") {
			var found=-1;
			for(var i=0;i<this.parent.children.length && found==-1;i++){
				if(this.parent.children[i].getName()==this.getName())
					found = i;
			}
			
			this.parent.children.splice(found, 1);
			dojo.publish("/davinci/resource/resourceChanged",["deleted",this]);
		} else {
			//TODO: refresh the resource in the tree if it is a dir -- delete may have been partial.
			alert(response);
		}
	}