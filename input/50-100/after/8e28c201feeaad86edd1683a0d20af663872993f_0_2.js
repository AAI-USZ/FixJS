function url(textID) {
    var linkAddr = prompt("Please enter the full URL", "http://");
    if (linkAddr && linkAddr != "http://") {
        var linkTitle = prompt("Please enter the title", "");
        if (linkTitle == "") linkTitle = linkAddr;
        if (linkAddr && linkTitle) wrap('url', linkTitle, linkAddr, textID);
    }
}