function(html) {
        var $new_comments = $(html);
        this.$el.replaceWith($new_comments);
        this.setElement($new_comments);
        this.story_view.attach_tooltips();
        this.initialize();
    }