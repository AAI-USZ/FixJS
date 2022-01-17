function (elem) {
    var lastchild = Modernizr.addTest('lastchild', elem.lastChild.offsetWidth > elem.firstChild.offsetWidth);
}