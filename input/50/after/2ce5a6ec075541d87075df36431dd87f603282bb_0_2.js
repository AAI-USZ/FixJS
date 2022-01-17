function(loc) {
        loc = loc || location.href;
        this.link_el.val(loc);
        $(this.el).show();
        this.focus();
    }