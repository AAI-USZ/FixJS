function(evt) {
        var inputKeywords = this.$('#id_keywords');
        var currentKeywords = inputKeywords.val();

        this.$el.data('initial-keywords', currentKeywords);
        this.$('#map-block').data('initial-keywords', currentKeywords);
        this.refresh();
    }