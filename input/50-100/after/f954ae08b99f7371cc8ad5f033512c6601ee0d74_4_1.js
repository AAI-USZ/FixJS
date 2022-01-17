function getElementPath(element) {
    var i=-1;
    return $(element).parents('.node').andSelf().map(function() {
        i++;
        var self = $(this);
        //if (self.hasClass('page')) return getId(self);
        // id for top-level element
        if (i==0) return getId(self);
        return self.prevAll('.node').length;
    }).get().join('_');
}