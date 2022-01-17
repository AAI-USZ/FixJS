function(li_pos) {
            var info = this;
            var li = info.data.supsel_select.find('li');
        	
            /* Disallow multi select in single select drop */
            if(!shift || !info.data.is_multiple){
                li.removeClass('supsel_on_key');
            }
            var current_li = li.filter(':visible:not(.supsel_disabled)').filter(':eq('+li_pos+')');
            if(!current_li.position()){
                li_pos = 0;
                current_li = li.filter(':visible').filter(':eq('+li_pos+')');
            }
            current_li.addClass('supsel_on_key');  

            maxHeight = parseInt(info.data.supsel_select.find('.supsel_results_list').css('maxHeight'), 10);
            visible_top = info.data.supsel_select.find('.supsel_results_list').scrollTop();
            visible_bottom = maxHeight + visible_top;
            high_top = current_li.position().top + info.data.supsel_select.find('.supsel_results_list').scrollTop();
            high_bottom = high_top + current_li.outerHeight();
            high_top = high_top - 70;
            
            if (high_bottom >= visible_bottom) {
                info.data.supsel_select.find('.supsel_results_list').scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
            } else if (high_top < visible_top) {
                info.data.supsel_select.find('.supsel_results_list').scrollTop(high_top);
            }
        }