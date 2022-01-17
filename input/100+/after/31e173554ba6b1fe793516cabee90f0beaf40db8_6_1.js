function () {
	var pageNameArr = window.location.href.match(/docs\/(.*)\.html/),
		pageName = pageNameArr && pageNameArr[1];

	if (pageName && location.hash == "") {
		window.location.hash = "&who=" + pageName
	}
	can.route(":who", {who : "index"})("/search/:search");


	new Jmvcdoc.Nav('#nav');
	new Jmvcdoc.Content("#doc",{clientState : can.route.data});
	new Jmvcdoc.Search("#search",{clientState : can.route.data});
}