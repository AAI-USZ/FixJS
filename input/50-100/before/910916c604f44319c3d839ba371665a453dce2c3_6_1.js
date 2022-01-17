function ResponseWrapper() {
    var res = global.$_S.RESPONSE;

    res.renderView = function(template, view) {
        var self = this;
        view.render(template, function(data) {
            self.render(data);
        });
    };
    return res;
}