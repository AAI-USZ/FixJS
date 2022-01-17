function checkServerStatus() {
    var request = new XMLHttpRequest();
    request.open("GET", rssUrl, true);
    request.onreadystatechange = function() {
	if (request.readyState == 4) {
	    countGames(request.responseXML.getElementsByTagName('item'));
	}
    }
    request.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1984 00:00:00 GMT");
    request.send();
}