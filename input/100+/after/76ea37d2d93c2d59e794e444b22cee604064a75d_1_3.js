function(url) {
	var id = encodeURIComponent(this.user.get("sessionID"));
	var parts = Echo.Utils.parseURL(url);
	var session = parts["query"]
		? parts["query"].match(/=$/) ? id : "&sessionID=" + id
		: "sessionID=" + id;
	var url = "{data:scheme}://{data:domain}{data:path}?{data:query}{data:fragment}";
	return this.substitute(url, {
		"scheme": parts["scheme"] || "http",
		"domain": parts["domain"],
		"path": parts["path"],
		"query": (parts["query"] || "") + session,
		"fragment": parts["fragment"] ? ("#" + parts["fragment"]) : ""
	});
}