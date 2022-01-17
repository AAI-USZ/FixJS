function(container, obj, registered) {
	var cached = (obj.local ? "locally cached" : "not locally cached");
	var image = (registered ? "yes" : "no");
	var label = (registered ? "registered" : "not added (service already registered)");
	var sniper = '<dt><a href="' + obj.uri + '">' + obj.uri + '</a> <img src="../extension/rdf-extension/images/' + image + '.png" width="16" height="16" alt="' + label + '" title="' + label + '" /></dt><dd><strong>' + obj.name + '</strong>, ' + cached + '</dd>';
	if (!registered) {
		sniper += '<dd>' + label + '</dd>';
	}
	container.append(sniper).fadeIn("slow");
}