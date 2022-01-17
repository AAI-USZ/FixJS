function($){

    /* Select Options */
    var select_options = {
        blank_option: 'Choose option...',
        select_width: 300,
        info_width: 350,
        /* Ajax variables */
        ajax_url: '',
        ajax_data: {},
        ajax_search_name: 'superselect_search',
        ajax_orig_results: false /* Add original values from select to search results */
    };

    var select_data = {
        /* Status */
        is_multiple: false,
        is_shown: false,
        is_ajax: false,
        is_click: false,
        /* ids and select */
        orig_id: '',
        orig_select: null,
        supsel_id: '',
        supsel_select: null,
        /* Values */
        orig_values: {},
        search_values: {},
        ajax_values: {},
        values: {}
    };

    var super_select_funcs = {
        /************************/
        /*** Public functions ***/
        /************************/
        create: function(options, input) {
            var info = this;

            /* Replace default options with requested options */
            info.options = $.extend({}, select_options, options);
            info.data = $.extend({}, select_data, {});

            /* Reset array values */
            info.data.orig_values = {};
            info.data.search_values = {};
            info.data.ajax_values = {};
            info.data.values = {};
            
            /* Get or set id */
            if ($(input).attr('id')) {
                info.data.orig_id = $(input).attr('id');
            } else {
                info.data.orig_id = Math.ceil(Math.random() * 100000);
                $(input).attr('id', info.data.orig_id);
            }
            
            info.data.is_multiple = ($('#'+info.data.orig_id).attr('multiple') ? true: false);
            info.data.supsel_id = info.data.orig_id+'_supsel';

            /* Create html for supsel */
            var new_select = '';
            new_select += '<div id="'+info.data.supsel_id+'" class="supsel_div">';
            new_select += '   <div class="supsel_select supsel_topoff" tabindex="0" style="width: '+info.options.select_width+'px;">';
            new_select += '       <div class="supsel_select_values" style="width: '+(info.options.select_width-15)+'px;"></div>';
            new_select += '       <div class="'+(info.data.is_multiple ? 'supsel_select_add': 'supsel_select_arrow supsel_arrow_down')+'"></div>';
            new_select += '       <div class="supsel_clear"></div>';
            new_select += '   </div>';
            new_select += '   <div class="supsel_info" style="width: '+info.options.info_width+'px;">';
            new_select += '       <div class="supsel_search"><input placeholder="Search..." type="text" value="" /></div>';
            new_select += '       <div class="supsel_results">';
            new_select += '           <div class="supsel_noresults" tabindex="-1">No Results Found</div>';
            new_select += '           <div class="supsel_results_list" tabindex="-1"><ul></ul></div>';
            new_select += '       </div>';
            new_select += '   </div>';
            new_select += '</div>';

            /* Set inputs into variables */
            info.data.orig_select = $('#'+info.data.orig_id);
            info.data.supsel_select = $(new_select);

            /* Set items from original select */
            info.data.orig_select.attr('tabindex', '-1');
            info.options.blank_option = (info.data.orig_select.data('placeholder') ? info.data.orig_select.data('placeholder'): info.options.blank_option);
            info.data.is_ajax = (info.options.ajax_url != '' ? true: false);

            /* Hide original select dropdown */
            //info.data.orig_select.hide();

            /* Create new dropdown */
            info.data.supsel_select.insertAfter(info.data.orig_select);

            /* Create orig_values array and add original values to values array */
            var o_num = 0; // option
            var g_num = 0; // group
            var go_num = 0; // group option
            info.data.orig_select.children().each(function(index, value) {
                if ($(this).prop('tagName') == 'OPTION') {
                    if($(this).is(':selected')){
                        info.data.values['o-'+o_num] = {
                            'val':this.value,
                            'txt':this.text
                        };
                    }
                    info.data.orig_values['o-'+o_num] = {
                        'val':this.value,
                        'txt':this.text
                    };
                    if($(this).is(':disabled')){
                        info.data.orig_values['o-'+o_num].dis = true;
                    }
                    o_num++;
                } else {
                    info.data.orig_values['g-'+g_num] = {
                        'gid':g_num,
                        'lbl':this.label
                    };
                    go_num = 0;
                    $(this).children().each(function(){
                        if($(this).is(':selected')){
                            info.data.values['go-'+g_num+'-'+go_num] = {
                                'val':this.value,
                                'txt':this.text
                            };
                        }
                        info.data.orig_values['go-'+g_num+'-'+go_num] = {
                            'val':this.value,
                            'txt':this.text,
                            'grp':g_num
                        };
                        if($(this).is(':disabled')){
                            info.data.orig_values['go-'+g_num+'-'+go_num].dis = true;
                        }
                        go_num++;
                    });
                    g_num++;
                }
            });

            /* Add content to results */
            info._add_li_to_results();

            /* Add Click events results */
            info._add_click_to_li();

            /* Add click to supsel_select */
            info.data.supsel_select.find('.supsel_select').click(function(){
                if(info.data.is_shown){
                    info.hide_results();
                } else {
                    info.show_results();
                }
            });

            /* Stops from click */
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

            /* Detect if click outside of supsel */
            $(document).click(function(event) {
                if($(event.target).parents().index(info.data.supsel_select) == -1) {
                    if(info.data.is_shown) {
                        info.hide_results();
                        info._search_clear();
                    }
                }
            });

            /* Add key events */
            info._add_key_events_to_results();

            /* Add key event to search input */
            info.data.supsel_select.find('.supsel_search input').keyup(function(e){
                if(e.keyCode != 38 && e.keyCode != 40){ /* Exclude up and down arrows */
                    info.search(this.value);
                }
            });

            /* Set display select */
            info._set_display_select();

            /* Highlight original values */
            info._set_display_results();

            /* If no values selected set blank placeholder */
            info._set_display_blank();
        },
        set_values: function(values) {
            var info = $(this).data('superselect');

            if($.isArray(values)) {
                $.each(values, function(index, value) {
                    /* Check to ensure values exist */
                    if(info.data.orig_select.find('option[value="'+value+'"]').length > 0){
                        if(!info.data.is_multiple) {
                            info.data.values = {};
                        }
                        info.data.values[info.data.orig_select.find('option[value="'+value+'"]:eq(0)').index()] = {
                            'val':info.data.orig_select.find('option[value="'+value+'"]:eq(0)').val(),
                            'txt':info.data.orig_select.find('option[value="'+value+'"]:eq(0)').text()
                        };
                    }
                });
            } else {
                if(info.data.orig_select.find('option[value="'+values+'"]').length > 0){
                    if(!info.data.is_multiple) {
                        info.data.values = {};
                    }
                    info.data.values[info.data.orig_select.find('option[value="'+values+'"]:eq(0)').index()] = {
                        'val':info.data.orig_select.find('option[value="'+values+'"]:eq(0)').val(),
                        'txt':info.data.orig_select.find('option[value="'+values+'"]:eq(0)').text()
                    };
                }
            }

            info._set_display_select();
            info._set_display_results();
            info._set_select_values();
        },
        show_results: function() {
            var info = this;

            info.data.supsel_select.find('.supsel_info').show();
            /* Focus on search box */
            info.data.supsel_select.find('.supsel_search input').focus();
            /* Change z-index */
            info.data.supsel_select.find('.supsel_select').css('z-index', 100);
            info.data.supsel_select.find('.supsel_info').css('z-index', 99);
            /* Change select style */
            info.data.supsel_select.find('.supsel_topoff').removeClass('supsel_topoff').addClass('supsel_topon');
            /* Change arrow image */
            info.data.supsel_select.find('.supsel_arrow_down').removeClass('supsel_arrow_down').addClass('supsel_arrow_up');

            info.data.is_shown = true;
        },
        hide_results: function() {
            var info = this;

            info.data.supsel_select.find('.supsel_info').hide();
            /* Change z-index */
            info.data.supsel_select.find('.supsel_select').css('z-index', 2);
            info.data.supsel_select.find('.supsel_info').css('z-index', 1);
            /* Change select style */
            info.data.supsel_select.find('.supsel_topon').removeClass('supsel_topon').addClass('supsel_topoff');
            /* Change arrow image */
            info.data.supsel_select.find('.supsel_arrow_up').removeClass('supsel_arrow_up').addClass('supsel_arrow_down');

            info.data.is_shown = false;
        },
        search: function(input_value) {
            var info = this;

            info.data.search_values = {};

            if(input_value != '') {
                if(info.data.is_ajax) {
                    /* Ajax Search requested location */
                    var search_name = {};
                    search_name[info.options.ajax_search_name] = input_value;
                    $.ajax({
                        url: info.options.ajax_url,
                        type: 'POST',
                        dataType: 'json',
                        data: $.extend({}, info.options.ajax_data, search_name),
                        success: function(data){
                            /* Run through json data and add it to supsel data */
                            info.data.ajax_values = {};
                            $.each(data, function(index, value) {
                                /* Randomize index on top of name so there are no duplicates */
                                info.data.ajax_values[index+(Math.ceil(Math.random() * 1000))] = {
                                    'val':index, 
                                    'txt':value
                                };
                            });

                            info._add_li_to_results();
                            info._add_click_to_li();
                        }
                    });
                } else {
                    /* Take input_value and search array */
                    $.each(this.data.orig_values, function(index, value) {
                        var search = new RegExp(input_value, 'gi');
                        if(value.txt){
                        	 if(value.txt.match(search)) {
	                            info.data.search_values[index] = {
	                                'val':value.val, 
	                                'txt':value.txt
	                            };
	                        } 
                        }
                    });

                    info._search_hide_display_values();
                }
            } else {
                info._search_clear();
                info._search_show_display_values();
            }
        },
        destroy: function() {
            var info = $(this).data('superselect');

            /* Remove Super Drop */
            info.data.supsel_select.remove();

            /* Show original select */
            info.data.orig_select.show();

            /* Destroy Data */
            $.removeData(this, 'superselect');
        },
        /*************************/
        /*** Private functions ***/
        /*************************/
        _set_select_values: function() {
            var info = this;
            var location;

            if(!info.data.is_ajax){
                /* Non Ajax */
                info.data.orig_select.find('option').removeAttr('selected');
                $.each(info.data.values, function(index, value) {
                    location = index.split('-');
                    if(info.data.is_multiple) {
                        // Group option
                        if(location[0] == 'go'){
                            info.data.orig_select.find('optgroup:eq('+location[1]+') option:eq('+location[2]+')').attr('selected', true);
                        } else {
                            info.data.orig_select.find('option:eq('+location[1]+')').attr('selected', true);
                        }
                    } else {
                        info.data.orig_select.val(value.val);
                    }
                });
            } else {
                /* Ajax */
                info.data.orig_select.html(''); /* Empty original select */
                $.each(info.data.values, function(index, value) {
                    if(info.data.is_multiple) {
                        /* Set original select */
                        info.data.orig_select.append('<option selected="selected" value="'+value.val+'">'+value.txt+'</option>');
                    } else {
                        info.data.orig_select.html('');
                        info.data.orig_select.html('<option selected="selected" value="'+value.val+'">'+value.txt+'</option>');
                    }
                });
            }
        },
        _set_display_select: function() {
            var info = this;

            if(!info.data.is_multiple) {
                /* Single */

                /* Set supsel_select_values value */
                $.each(info.data.values, function(index, value) {
                    info.data.supsel_select.find('.supsel_select .supsel_select_values').html(value.txt);
                });
            } else {
                /* Multiple */

                /* Add items to select */
                var multi_values = '';
                $.each(info.data.values, function(index, value) {
                    multi_values += '<div data-index="'+index+'" class="supsel_select_item" style="max-width: '+(info.options.select_width-15)+'px;overflow:hidden;">';
                    multi_values += '   <div class="supsel_select_item_text">'+value.txt+'</div>';
                    multi_values += '   <div class="supsel_select_item_del"></div>';
                    multi_values += '</div>';
                });
                info.data.supsel_select.find('.supsel_select .supsel_select_values').html(multi_values);

                /* Add click event to newly added items */
                info._add_click_to_delete();
            }
        },
        _set_display_results: function() {
            var info = this;

            /* Highlight Single or Hide Multi Select li's */
            info.data.supsel_select.find('.supsel_info li').removeClass('supsel_show supsel_on supsel_hide');
            if(!info.data.is_multiple){
                /* Set style for selected single value */
                $.each(info.data.values, function(index, value) {
                    /* Highlight li */
                    info.data.supsel_select.find('.supsel_results li[data-index="'+index+'"]').addClass('supsel_on');
                });
            } else {
                /* Set style for selected multi value */
                $.each(info.data.values, function(index, value) {
                    /* Hide li */
                    info.data.supsel_select.find('.supsel_results li[data-index="'+index+'"]').addClass('supsel_hide');
                });
            }
        },
        _set_display_blank: function() {
            var info = this;

            if(Object.keys(info.data.values).length === 0){
                info.data.supsel_select.find('.supsel_select .supsel_select_values').html('<span class="show_blank">'+info.options.blank_option+'</span>');
            } else {
                info.data.supsel_select.find('.supsel_select .supsel_select_values .show_blank').remove();
            }
        },
        _add_li_to_results: function() {
            var info = this;
            var new_results = '';            

            if(!info.data.is_ajax){
                /* Non Ajax */

                /* Add li's to results */
                var cur_gid = false;
                var grp_start = false;
                $.each(info.data.orig_values, function(index, value) {
                	/* Check if its disabled */
                    if(value.lbl) {
                        if(value.gid != cur_gid && grp_start) {
                            /* Close off group if this value does not match */
                            new_results += '</ul>';
                            cur_gid = false;
                        }
                        /* Add group label  */
                        new_results += '<li class="supsel_label">'+value.lbl+'</li>';
                        new_results += '<ul>';
                        grp_start = true;
                        cur_gid = value.gid;
                    } else {
                        /* Add option */
                        if(value.grp != cur_gid && grp_start) {
                            /* Close off group if this value does not match */
                            new_results += '</ul>';
                            cur_gid = false;
                            grp_start = false;
                        }
                		new_results += '<li data-index="'+index+'" '+(value.dis ? 'class="supsel_disabled"': '')+'>'+value.txt+'</li>';
                    }
                });
                if(grp_start) {
                    /* Close off group */
                    new_results += '</ul>';
                    grp_start = false;
                    grp_end = false;
                }
                info.data.supsel_select.find('.supsel_results ul').html(new_results);
            } else {
                /* Ajax */

                /* Add li's to results from original and ajax */
                if(info.options.ajax_orig_results) {
                    /* Add original values to results */
                    $.each(info.data.orig_values, function(index, value) {
                        new_results += '<li data-index="'+index+'">'+value.txt+'</li>';
                    });
                }
                /* Add search results to results */
                $.each(info.data.ajax_values, function(index, value) {
                    new_results += '<li data-index="'+index+'">'+value.txt+'</li>';
                });
                info.data.supsel_select.find('.supsel_results ul').html(new_results);
            }
        },
        _add_click_to_li: function() {
            var info = this;

            info.data.supsel_select.find('.supsel_results ul li:not(.supsel_disabled,.supsel_label)').click(function() {
                var index = $(this).attr('data-index');
                var value = info.data.orig_values[index].val;
                var text = info.data.orig_values[index].txt;

                if(!info.data.is_multiple) {
                    /* Empty array for single value */
                    info.data.values = {};
                }
                info.data.values[index] = {
                    'val':value,
                    'txt':text
                };

                /* Hide results for single only */
                if(!info.data.is_multiple) {
                    info.hide_results();
                }

                /* Set display select */
                info._set_display_select();

                /* Style results */
                info._set_display_results();

                /* Focus on search box */
                info.data.supsel_select.find('.supsel_search input').focus();

                /* Set original select values */
                info._set_select_values();

                return false;
            });
        },
        _add_click_to_delete: function() {
            var info = this;

            info.data.supsel_select.find('.supsel_select .supsel_select_item_del').click(function(){
                var index = $(this).parent().attr('data-index');

                /* Remove value from array */
                delete info.data.values[index];

                /* Remove div */
                $(this).parent().remove();

                /* Remove hide from li */
                info.data.supsel_select.find('.supsel_results li[data-index="'+index+'"]').removeClass('supsel_hide');

                /* If no values selected set blank placeholder */
                info._set_display_blank();

                /* Set original select dropdown */
                info._set_select_values();
            });
        },
        _add_key_events_to_results: function() {
            var info = this;
            var li_pos = '';
            var cur_index;
            
            info.data.supsel_select.find('.supsel_search').keydown(function(e){
                /* Shift Key also pressed*/
                shift =  e.shiftKey;
                                
                /* Key down */
                if (e.keyCode == 40) {                  
                    if(li_pos === '') {
                        li_pos = 0;
                    } else if((li_pos+1) < info.data.supsel_select.find('li').filter(':visible:not(.supsel_disabled, .supsel_label)').length) {
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
                                'val':info.data.orig_values[cur_index].val,
                                'txt':info.data.orig_values[cur_index].txt
                            };
                        });
                    } else {
                        /* Set single value */
                        info.data.values = {};
                        cur_index = info.data.supsel_select.find('.supsel_on_key').attr('data-index');
                        info.data.values[cur_index] = {
                            'val':info.data.orig_values[cur_index].val,
                            'txt':info.data.orig_values[cur_index].txt
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

            });
        },
        _highlight_scroll_li: function(li_pos) {
            var info = this;
            var li = info.data.supsel_select.find('li');
        	
            /* Disallow multi select in single select drop */
            if(!shift || !info.data.is_multiple){
                li.removeClass('supsel_on_key');
            }
            var current_li = li.filter(':visible:not(.supsel_disabled, .supsel_label)').filter(':eq('+li_pos+')');
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
        },
        _search_clear: function() {
            var info = this;

            /* Clear search input */
            info.data.supsel_select.find('.supsel_search input').val('');

            /* Hide supsel_noresults */
            info.data.supsel_select.find('.supsel_results .supsel_noresults').hide();

            /* Remove class supsel_show_except supsel_show supsel_on */
            info.data.supsel_select.find('.supsel_results').removeClass('supsel_show_except');
            info.data.supsel_select.find('.supsel_results li').removeClass('supsel_show supsel_on');
        },
        _search_hide_display_values: function() {
            var info = this;

            /* Remove class supsel_show supsel_on */
            info.data.supsel_select.find('.supsel_results li').removeClass('supsel_show supsel_on');

            /* Add class to results */
            info.data.supsel_select.find('.supsel_results').addClass('supsel_show_except');

            /* Add class supsel_show */
            $.each(info.data.search_values, function(index, value) {
                info.data.supsel_select.find('.supsel_results li[data-index="'+index+'"]:not(.supsel_hide)').addClass('supsel_show');
            });

            /* If no results show supsel_noresults */
            if(info.data.supsel_select.find('.supsel_results li:visible').length > 0){
                info.data.supsel_select.find('.supsel_results .supsel_noresults').hide();
            } else {
                info.data.supsel_select.find('.supsel_results .supsel_noresults').show();
            }
        },
        _search_show_display_values: function() {
            var info = this;

            /* Remove class to results */
            info.data.supsel_select.find('.search_results').removeClass('supsel_show_except');

            /* Remove class supsel_show */
            info.data.supsel_select.find('.search_results li').removeClass('supsel_show');
        }
    };
    
    $.fn.superselect = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            /* Only allow select dropdown */
            if($(this).is('select')) {
                /* Method calling logic */
                if (super_select_funcs[options]) {
                    if($(this).data('superselect')) {
                        super_select_funcs[options].apply(this, args);
                    }
                } else if (typeof options === 'object' || !options) {
                    if(!$(this).data('superselect')){
                    		var super_select_obj = Object.create(super_select_funcs);
	                        super_select_obj.create(options, this);
	                        $.data(this, 'superselect', super_select_obj);
                    }   
                } else {
                    $.error('Method ' +  options + ' does not exist in Super Select');
                }
            } else {
                $.error('Super Select can only be applied to select dropdowns.');
            }
        });
    };
    

}