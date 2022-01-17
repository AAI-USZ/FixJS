function(){
        me.removeSelectedTag(tag_name);
        tag.dispose();
        $('.acResults').hide();//a hack to hide the autocompleter
        me.fixHeight();
    }