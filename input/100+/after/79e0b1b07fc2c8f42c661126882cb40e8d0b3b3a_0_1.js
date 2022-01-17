function calc(element, prop) {
    var ret = 0;

    while (element.nodeName != "HTML") {
        ret += element[prop];
        element = element.parentNode;
    }

    return ret;
}