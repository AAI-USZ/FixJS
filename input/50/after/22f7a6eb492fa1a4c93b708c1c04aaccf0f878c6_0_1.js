function video(textID) {
    var linkAddr = prompt("Please enter the url ", "http://www.youtube.com/");

    if (linkAddr && linkAddr != "http://www.youtube.com/") insert('[video=' + linkAddr + ']', textID);
}