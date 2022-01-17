function (root) {
    cache = {};
    CommonjsController.index = Controller.index = Controller.index || {};
    Controller.aliases = Controller.aliases || {};
    Controller.context = Controller.context || {};
    exports.addBasePath(root + '/app/controllers', null, null, root);
}