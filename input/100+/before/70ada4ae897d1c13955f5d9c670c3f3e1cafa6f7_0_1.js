function(id, name, type, product_id, showButton, isFiltered) {
            var anchor = "", 
                filter_repo_class = "";
            if ( showButton && permissions.manage_changesets){
                anchor = '<a ' + 'class="fr content_add_remove remove_' + type + ' + st_button"' +
                                 'data-type="' + type + '" data-product_id="[' + product_id +  ']" data-id="' + id + '">';
                            anchor += i18n.remove + "</a>";
            }
            if(type === "repo" && isFiltered) {
                filter_repo_class = '<span class="filter_warning_icon fl promotion_tipsify"' + " data-content_id=\"" +
                            id +"\" data-content_type=\"repo\""  + '>&nbsp;</span> ';
            }


            return '<li>' + anchor + '<div class="no_slide">' + filter_repo_class + '<span class="sort_attr">'  + name + '</span></div></li>';

        }