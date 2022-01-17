function(evt) {
        var inputKeywords = this.$('#id_keywords');
        var currentKeywords = inputKeywords.val();

        this.$el.data('initial-keywords', currentKeywords.trim());
        this.$('#map-block').data('initial-keywords', currentKeywords);
        this.refresh();
    }