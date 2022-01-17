function(a){
        dw_linkwiz.$entry.val(a.title);
        if(a.title == '' || a.title.substr(-1) == ':'){
            dw_linkwiz.autocomplete_exec();
        }else{
            if (jQuery(a.nextSibling).is('span')) {
                dw_linkwiz.insertLink(a.nextSibling.innerHTML);
            }else{
                dw_linkwiz.insertLink('');
            }
        }
    }