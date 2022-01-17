function openLinksInNewWindow() {

	var hostName = document.location.href.match(/^(http:\/\/)?([^\/]+)/i)[2];

	if (! document.getElementsByTagName) return;

	var links = document.getElementsByTagName("a");

	for (var i = links.length - 1; i >= 0; i--) {

		href = links[i].getAttribute("href");

		if (href.indexOf(hostName) == -1 && href.indexOf("http") >= 0) {

			links[i].setAttribute("target", "_blank");

		};

	};

}