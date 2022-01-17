function(element) {
    this._element = element;
    this._hidden_tags_input = element.find('input[name="tags"]');//this one is hidden
    this._tags_container = element.find('ul.tags');
    this._error_alert = $('.tag-editor-error-alert > span');

    var me = this;
    this._tags_container.children().each(function(idx, elem){
        var tag = new Tag();
        tag.setDeletable(true);
        tag.setLinkable(false);
        tag.decorate($(elem));
        tag.setDeleteHandler(me.getTagDeleteHandler(tag));
    });

    var visible_tags_input = element.find('.new-tags-input');
    this._visible_tags_input = visible_tags_input;
    this.saveHeight();

    var me = this;
    var tagsAc = new AutoCompleter({
        url: askbot['urls']['get_tag_list'],
        onItemSelect: function(item){
            if (me.isSelectedTagName(item['value']) === false) {
                me.completeTagInput();
            } else {
                me.clearNewTagInput();
            }
        },
        preloadData: true,
        minChars: 1,
        useCache: true,
        matchInside: true,
        maxCacheLength: 100,
        delay: 10
    });
    tagsAc.decorate(visible_tags_input);
    this._autocompleter = tagsAc;
    visible_tags_input.keyup(this.getTagInputKeyHandler());

    element.click(function(e) {
        visible_tags_input.focus();
        return false;
    });
}