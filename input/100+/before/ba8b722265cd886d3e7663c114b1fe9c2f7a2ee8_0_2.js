function(options, input) {
            var info = this;

            /* Replace default options with requested options */
            info.options = $.extend({}, select_options, options);
            info.data = $.extend({}, select_data, {});

            /* Reset array values */
            info.data.orig_values = {};
            info.data.search_values = {};
            info.data.values = {};
            
            /* Set global variables */
            if ($(input).attr('id')) {
                info.data.orig_id = $(input).attr('id');
            } else {
                info.data.orig_id = Math.ceil(Math.random() * 100000);
                $(input).attr('id', info.data.orig_id);
            }
            
            $('#'+info.data.orig_id+' option:selected').each(function(index, value) {
                info.data.values[index] = {
                    'val':this.value, 
                    'txt':this.text
                };
            });
            info.data.multiple = ($('#'+info.data.orig_id).attr('multiple') ? true: false);
            info.data.supsel_id = info.data.orig_id+'_supsel';

            /* Create html for supsel */
            var new_select = '';
            new_select += '<div id="'+info.data.supsel_id+'" class="supsel_div">';
            new_select += '   <div class="supsel_select supsel_topoff" tabindex="0" style="width: '+info.options.select_width+'px;">';
            new_select += '       <div class="supsel_select_values">Select option</div>';
            new_select += '       <div class="'+(info.data.multiple ? 'supsel_select_add': 'supsel_select_arrow supsel_arrow_down')+'"></div>';
            new_select += '       <div class="supsel_clear"></div>';
            new_select += '   </div>';
            new_select += '   <div class="supsel_info" style="width: '+info.options.info_width+'px;">';
            new_select += '       <div class="supsel_search"><input placeholder="Search..." type="text" value="" /></div>';
            new_select += '       <div class="supsel_results">';
            new_select += '           <div class="supsel_noresults">No Results Found</div>';
            new_select += '           <div class="supsel_results_list"><ul></ul></div>';
            new_select += '       </div>';
            new_select += '   </div>';
            new_select += '</div>';
            var new_results = '';

            /* Set inputs into variables */
            info.data.orig_select = $('#'+info.data.orig_id);
            info.data.supsel_select = $(new_select);

            /* Set items from original select */
            info.data.orig_select.attr('tabindex', '-1');
            info.options.blank_option = (info.data.orig_select.data('placeholder') ? info.data.orig_select.data('placeholder'): info.options.blank_option);
            info.data.is_ajax = (info.options.ajax_url != '' ? true: false);

            /* Hide original select dropdown */
            info.data.orig_select.hide();

            /* Create new dropdown */
            info.data.supsel_select.insertAfter(info.data.orig_select);

            /* Append values from original select and create array */
            info.data.orig_select.find(' > option').each(function(index, value) {
                new_results += '<li data-index="'+index+'" data-value="'+value+'">'+this.text+'</li>';
                info.data.orig_values[index] = {
                    'val':this.value, 
                    'txt':this.text
                };
            });
            info.data.supsel_select.find('.supsel_results ul').append(new_results);

            /* Add click to supsel_select */
            info.data.supsel_select.find('.supsel_select').click(function(){
                if(info.data.is_shown){
                    info.hide_results();
                } else {
                    info.show_results();
                }
            });

            /*Stops from click */
            info.data.supsel_select.find('.supsel_select').mousedown(function(){
                info.is_click = true;
            });
            info.data.supsel_select.find('.supsel_select').mouseup(function(){
                info.is_click = false;
            });
			
            /* Add tab focus to supsel_select */
            info.data.supsel_select.find('.supsel_select').focus(function(){
                if(!info.is_click){
                    $(this).click();
                }   
            });
            var chosen = "";
            info.data.supsel_select.find('.supsel_search').keydown(function(e){
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
            });


            /* Detect if click outside of supsel */
            $(document).click(function(event) {
                if($(event.target).parents().index(info.data.supsel_select) == -1) {
                    if(info.data.is_shown) {
                        info.hide_results();
                        info.search_clear();
                        info.set_display_values();
                    }
                }
            });

            /* Add click events to results li */
            if(!info.data.is_ajax){
                info.data.supsel_select.find('.supsel_results ul li').click(function() {
                    if(info.data.multiple){
                        /* Push multiple values */
                        info.data.values[$(this).attr('data-index')] = {
                            'val':$(this).attr('data-value'),
                            'txt':$(this).html()
                        };
                    } else {
                        /* Set single value */
                        info.data.values = {};
                        info.data.values[$(this).attr('data-index')] = {
                            'val':$(this).attr('data-value'),
                            'txt':$(this).html()
                        };
                    }

                    info.hide_results();
                    info.set_select_values();
                    info.set_display_values();
                });
            }

            /* Add key event to search input */
            info.data.supsel_select.find('.supsel_search input').keyup(function(){
                info.search(this.value);
            });

            /* Select dropdown based upon dropdown value */
            info.set_display_values();

        }