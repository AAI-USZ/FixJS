function(){
           if(!options.inline){
               path_selector.show();
               scroll_obj.bind('#' + KT.common.escapeId(paths_id));
               path_selector.hide();
           }
           else {
               scroll_obj.bind('#' + KT.common.escapeId(paths_id));
           }
        }