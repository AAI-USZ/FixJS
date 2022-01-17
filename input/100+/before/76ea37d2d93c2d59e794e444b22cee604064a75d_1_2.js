function(url) {
		var id = encodeURIComponent(this.user.get("sessionID"));
		var parts = Echo.Utils.parseURL(url);
		var session = parts["query"]
			? parts["query"].match(/=$/) ? id : "&sessionID=" + id
			: "sessionID=" + id;
		return self.substitute("{Data:scheme}://{Data:domain}{Data:path}?{Data:query}{Data:fragment}", {
			"scheme": parts["scheme"] || "http",
			"domain": parts["domain"],
			"path": parts["path"],
			"query": (parts["query"] || "") + session,
			"fragment": parts["fragment"] ? ("#" + parts["fragment"]) : ""
		});
	}