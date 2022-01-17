function (e) {
        var target, href, me;
        me = this;
        target = $(e.target);
        href = target.attr('href');
        if (href === '#refine') {
            if (!this.canGoToRefinement()) {
                this.showAlert($('.popup #idea_description'));
            }
        } else if (href === '#publish') {
            if (!this.hasCategory()) {
                this.showAlert($('.popup .categories'));
            }
            if (!this.hasTitle()) {
                this.showAlert($('.popup #idea_title'));
            }
        }
    }