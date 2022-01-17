function() {
        var self = $(this);
        if (self.hasClass('page')) return getId(self);
        return self.prevAll('.node').length;
    }