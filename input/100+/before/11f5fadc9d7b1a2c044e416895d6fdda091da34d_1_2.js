function() {
        var params = this.get_render_params();
        params['story_header'] = this.story_header_template(params);
        params['story_share_view'] = new NEWSBLUR.Views.StoryShareView({
            model: this.model, 
            el: this.el
        }).template({
            story: this.model,
            social_services: NEWSBLUR.assets.social_services
        });
        this.$el.html(this.template(params));
        this.toggle_classes();
        this.toggle_read_status();
        this.generate_gradients();
        this.render_comments();

        return this;
    }