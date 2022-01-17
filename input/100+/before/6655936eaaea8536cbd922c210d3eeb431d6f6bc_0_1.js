function openLinksInNewWindow() {

    var hostName = document.location.href.match(/^(http:\/\/)?([^\/]+)/i)[2];

    if (! document.getElementsByTagName) return;

    var links = document.getElementsByTagName("a");

    for (var i = links.length - 1; i >= 0; i--) {

        if (links[i].getAttribute("href").indexOf(hostName) == -1) {

            links[i].setAttribute("target", "_blank");

        };

    };

}