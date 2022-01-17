function(element) {
    this._element = element;
    this._hidden_tags_input = element.find('input[name="tags"]');//this one is hidden
    this._tags_container = element.find('ul.tags');

    var visible_tags_input = element.find('.new-tags-input');
    this._visible_tags_input = visible_tags_input;

    var me = this;
    var tagsAc = new AutoCompleter({
        url: askbot['urls']['get_tag_list'],
        onItemSelect: function(){
            me.completeTagInput();
        },
        preloadData: true,
        minChars: 1,
        useCache: true,
        matchInside: true,
        maxCacheLength: 100,
        delay: 10
    });
    tagsAc.decorate(visible_tags_input);
    visible_tags_input.keyup(this.getTagInputKeyHandler());

    element.click(function(e) {
        visible_tags_input.focus();
        return false;
    });
}