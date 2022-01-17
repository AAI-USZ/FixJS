function()
    {
        var attr  = this.model.get('properties').attributes
        var dyn_attributes = this.dynamicAttributes(attr)

        this.$el.attr('data-label', attr.label)
        this.$el.attr('data-percent', attr.progress / 10)
        
        this.$el.removeClass(this.status_classes)
            // .toggleClass('selected', this.$el.hasClass('selected'))
            .addClass(dyn_attributes._torrent_class)

        var animate = this.$el.html() === '';

        this.$el.html(
            Templates.torrent_row(
                _.extend(this.model.get('properties').attributes, dyn_attributes)
            )
        )

        if(animate)
        {
            this.$el.css({
                scale: '0.9',
                opacity: 0
            }).animate({
                scale: 1,
                opacity: 1
            }, 200)
        }

        return this
    }