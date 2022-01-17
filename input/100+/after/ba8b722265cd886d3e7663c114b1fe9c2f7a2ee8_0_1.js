function(e){
                shift =  e.shiftKey;
                /* Key down */
                if (e.keyCode == 40) {			    	
                    if(chosen === "") {
                        chosen = 0;
                    } else if((chosen+1) < info.data.supsel_select.find('li').filter(':visible').length) {
                        chosen++;
                    }			        
                    var li = info.data.supsel_select.find('li');
                    if(!shift || !info.data.multiple){
                        li.removeClass('supsel_on_key');
                    }
                    var current_li = li.filter(':visible').filter(':eq('+chosen+')');
                    if(!current_li.position()){
                        chosen = 0;
                        current_li = li.filter(':visible').filter(':eq('+chosen+')');
                    }
                    current_li.addClass('supsel_on_key');
			        
                    maxHeight = parseInt(info.data.supsel_select.find('.supsel_results_list').css("maxHeight"), 10);
                    visible_top = info.data.supsel_select.find('.supsel_results_list').scrollTop();
                    visible_bottom = maxHeight + visible_top;
                    high_top = current_li.position().top + info.data.supsel_select.find('.supsel_results_list').scrollTop();
                    high_bottom = high_top + current_li.outerHeight();
                    if (high_bottom >= visible_bottom) {
                        info.data.supsel_select.find('.supsel_results_list').scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
                    } else if (high_top < visible_top) {
                        info.data.supsel_select.find('.supsel_results_list').scrollTop(high_top);
                    }
                    return false;
                }
                /* Key up */
                if (e.keyCode == 38) {
                    if(chosen === "") {
                        chosen = 0;
                    } else if(chosen > 0) {
                        chosen--;            
                    }
                    var li = info.data.supsel_select.find('li');
                    li.removeClass('supsel_on_key');
                    var current_li = li.filter(':visible').filter(':eq('+chosen+')');
                    if(!current_li.position()){
                        chosen = 0;
                        current_li = li.filter(':visible').filter(':eq('+chosen+')');
                    }
                    current_li.addClass('supsel_on_key');
			        
                    maxHeight = parseInt(info.data.supsel_select.find('.supsel_results_list').css("maxHeight"), 10);
                    visible_top = info.data.supsel_select.find('.supsel_results_list').scrollTop();
                    visible_bottom = maxHeight + visible_top;
                    high_top = current_li.position().top + info.data.supsel_select.find('.supsel_results_list').scrollTop()-70;
                    high_bottom = high_top + current_li.outerHeight();
                    if (high_bottom >= visible_bottom) {
                        info.data.supsel_select.find('.supsel_results_list').scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
                    } else if (high_top < visible_top) {
                        info.data.supsel_select.find('.supsel_results_list').scrollTop(high_top);
                    }
                    return false;
                }
                /* Key enter */
                if(e.keyCode == 13){
                    if(info.data.multiple){
                        /* Push multiple values */
                        info.data.supsel_select.find('.supsel_on_key').each(function(){
                            info.data.values[$(this).attr('data-index')] = {
                                'val':$(this).attr('data-value'),
                                'txt':$(this).html()
                            };
                        });
                    } else {
                        /* Set single value */
                        info.data.values = {};
                        info.data.values[info.data.supsel_select.find('.supsel_on_key').attr('data-index')] = {
                            'val':info.data.supsel_select.find('.supsel_on_key').attr('data-value'),
                            'txt':info.data.supsel_select.find('.supsel_on_key').html()
                        };
                    }

                    info.hide_results();
                    info.set_select_values();
                    info.set_display_values();
                    info.data.supsel_select.find('li').removeClass('supsel_on_key');
                }
                /* Tabbing out of sup_sel */
                if(e.keyCode == 9){
                	info.hide_results();
                }

            }