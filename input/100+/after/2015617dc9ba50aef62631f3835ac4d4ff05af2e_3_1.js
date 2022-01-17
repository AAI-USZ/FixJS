function init() {
    var menu = document.getElementById('contextMenu');
    menu.addEventListener('webkitTransitionEnd', contextmenu.transitionEnd.bind(contextmenu));
    config = requireLocal("../chrome/lib/config.js");
    utils = requireLocal("../chrome/lib/utils");
}