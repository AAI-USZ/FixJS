function() {
        this.make_modal();
        this.handle_cancel();
        this.open_modal();
        this.handle_keystrokes();
        this.setup_autocomplete();
        this.setup_chosen();
        this.focus_add_feed();
        
        this.$modal.bind('click', $.rescope(this.handle_click, this));
        
        var $add = $('.NB-add-url', this.$modal);
        $add.bind('focus', $.rescope(this.handle_focus_add_site, this));
        $add.bind('blur', $.rescope(this.handle_blur_add_site, this));
    }