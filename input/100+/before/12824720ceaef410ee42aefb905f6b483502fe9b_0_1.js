function(e){
                /* Shift Key also pressed*/
                shift =  e.shiftKey;
                                
                /* Key down */
                if (e.keyCode == 40) {                  
                    if(li_pos === '') {
                        li_pos = 0;
                    } else if((li_pos+1) < info.data.supsel_select.find('li').filter(':visible:not(.supsel_disabled)').length) {
                        li_pos++;
                    }         
                    if(info.data.supsel_select.find('li').length > 0) {
                        info._highlight_scroll_li(li_pos);
                    }
                    return false;
                }
                
                /* Key up */
                if (e.keyCode == 38) {
                    if(li_pos === '') {
                        li_pos = 0;
                    }else if(li_pos > 0) {
                        li_pos--;            
                    }
                    if(info.data.supsel_select.find('li').filter(':visible').length > 0) {
                        info._highlight_scroll_li(li_pos);
                    }
                                       
                    return false;
                }
            
                /* Key enter */
                if(e.keyCode == 13){
                    if(info.data.is_multiple){
                        /* Push multiple values */
                        info.data.supsel_select.find('.supsel_on_key').each(function(){
                            cur_index = $(this).attr('data-index');
                            info.data.values[cur_index] = {
                                'val':info.data.orig_select[cur_index].val,
                                'txt':info.data.orig_select[cur_index].txt
                            };
                        });
                    } else {
                        /* Set single value */
                        info.data.values = {};
                        cur_index = info.data.supsel_select.find('.supsel_on_key').attr('data-index');
                        info.data.values[cur_index] = {
                            'val':info.data.orig_select[cur_index].val,
                            'txt':info.data.orig_select[cur_index].txt
                        };
                    }

                    info.hide_results();
                    info._set_display_select();
                    info._set_display_results();
                    info._set_select_values();
                    info.data.supsel_select.find('li').removeClass('supsel_on_key');
                    
                    return false;
                }
                
                /* Tabbing out of sup_sel */
                if(e.keyCode == 9){
                    if(!shift){
                        info.hide_results();
                    }
                	 
                    return false;                  
                }

            }