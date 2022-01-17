function link(textID) {
    var linkAddr = prompt("Please enter the relative page url\nNOTE: only local pages!", "/");
    if (linkAddr && linkAddr != "/") {
        var linkTitle = prompt("Please enter the link text", "");
        if (linkTitle == "") linkTitle = linkAddr;
        if (linkAddr && linkTitle) wrap('link', linkTitle, linkAddr, textID);
    }
}