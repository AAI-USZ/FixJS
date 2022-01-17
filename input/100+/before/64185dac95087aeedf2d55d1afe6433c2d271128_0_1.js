function setSmartPlaylistEvents() {
    var form = $('#smart-playlist-form');
    
    form.find('.criteria_add').live('click', function(){
        var div = $('dd[id="sp_criteria-element"]').children('div:visible:last').next();
        
        div.show();
        div.children().removeAttr('disabled');
        div = div.next();
        if (div.length === 0) {
            $(this).hide();
        }
        appendAddButton();
        removeButtonCheck();
    });
	
    form.find('a[id^="criteria_remove"]').live('click', function(){
        var curr = $(this).parent();
        var curr_pos = curr.index();
        var list = curr.parent();
        var list_length = list.find("div:visible").length;
        var count = list_length - curr_pos;
        var next = curr.next();
        var add_button = form.find('a[id="criteria_add"]');
        var item_to_hide;
        
        //remove error message from current row, if any
        var error_element = curr.find('span[class="errors sp-errors"]');
        if (error_element.is(':visible')) {
            error_element.remove();
        }

       /* assign next row to current row for all rows below and including
        * the row getting removed
        */
       for (var i=0; i<count; i++) {
            var criteria = next.find('[name^="sp_criteria_field"]').val();
            curr.find('[name^="sp_criteria_field"]').val(criteria);
            
            var modifier = next.find('[name^="sp_criteria_modifier"]').val();
            populateModifierSelect(curr.find('[name^="sp_criteria_field"]'));
            curr.find('[name^="sp_criteria_modifier"]').val(modifier);
            
            var criteria_value = next.find('[name^="sp_criteria_value"]').val();
            curr.find('[name^="sp_criteria_value"]').val(criteria_value);
            
            var id = curr.find('[name^="sp_criteria"]').attr('id');
            var index = id.charAt(id.length-1); 
            /* if current and next row have the extra criteria value
             * (for 'is in the range' modifier), then assign the next
             * extra value to current and remove that element from
             * next row
             */
            if (curr.find('[name^="sp_criteria_extra"]').attr("disabled") != "disabled"
                && next.find('[name^="sp_criteria_extra"]').attr("disabled") != "disabled") {
            	
                var criteria_extra = next.find('[name^="sp_criteria_extra"]').val();
                curr.find('[name^="sp_criteria_extra"]').val(criteria_extra);
                disableAndHideExtraField(next.find(':first-child'), index+1);
            
            /* if only the current row has the extra criteria value,
             * then just remove the current row's extra criteria element
             */
            } else if (curr.find('[name^="sp_criteria_extra"]').attr("disabled") != "disabled"
                       && next.find('[name^="sp_criteria_extra"]').attr("disabled") == "disabled") {
                disableAndHideExtraField(curr.find(':first-child'), index);
                
            /* if only the next row has the extra criteria value,
             * then add the extra criteria element to current row
             * and assign next row's value to it
             */
            } else if (next.find('[name^="sp_criteria_extra"]').attr("disabled") != "disabled") {
                criteria_extra = next.find('[name^="sp_criteria_extra"]').val();
                enableAndShowExtraField(curr.find(':first-child'), index);
                curr.find('[name^="sp_criteria_extra"]').val(criteria_extra);
            }

            curr = next;
            next = curr.next();
        }
		
        /* Disable the last visible row since it holds the values the user removed
         * Reset the values to empty and resize the criteria value textbox
         * in case the row had the extra criteria textbox
         */
        item_to_hide = list.find('div:visible:last');
        item_to_hide.children().attr('disabled', 'disabled');
        item_to_hide.find('[name^="sp_criteria_field"]').val(0).end()
                    .find('[name^="sp_criteria_modifier"]').val(0).end()
                    .find('[name^="sp_criteria_value"]').val('');
        
        sizeTextBoxes(item_to_hide.find('[name^="sp_criteria_value"]'), 'sp_extra_input_text', 'sp_input_text');
        item_to_hide.hide();

        list.next().show();
        
        // always put '+' button on the last enabled row
        appendAddButton();
        // remove the 'x' button if only one row is enabled
        removeButtonCheck();
    });
	
    form.find('button[id="save_button"]').live("click", function(event){
        var data = $('form').serializeArray(),
            save_action = 'Playlist/smart-playlist-criteria-save',
            playlist_id = $('input[id="pl_id"]').val();
        
        $.post(save_action, {format: "json", data: data, pl_id: playlist_id}, function(data){
            callback(data, "save");
        });
    });
    
    form.find('button[id="generate_button"]').live("click", function(event){
        var data = $('form').serializeArray(),
            generate_action = 'Playlist/smart-playlist-generate',
            playlist_id = $('input[id="pl_id"]').val();
		
        $.post(generate_action, {format: "json", data: data, pl_id: playlist_id}, function(data){
            callback(data, "generate");
        });
    });
    
    form.find('button[id="shuffle_button"]').live("click", function(event){
        var data = $('form').serializeArray(),
            shuffle_action = 'Playlist/smart-playlist-shuffle',
            playlist_id = $('input[id="pl_id"]').val();
		
        $.post(shuffle_action, {format: "json", data: data, pl_id: playlist_id}, function(data){
            callback(data, "shuffle");
        });
    });
	
    form.find('dd[id="sp_type-element"]').live("change", function(){
        setupUI();  	
    });
    
    form.find('select[id^="sp_criteria"]:not([id^="sp_criteria_modifier"])').live("change", function(){
        var index_name = $(this).attr('id'),
            index_num = index_name.charAt(index_name.length-1);
        
        // disable extra field and hide the span
        disableAndHideExtraField($(this), index_num);
        populateModifierSelect(this);
    });
    
    form.find('select[id^="sp_criteria_modifier"]').live("change", function(){
        var criteria_value = $(this).next(),
            index_name = criteria_value.attr('id'),
            index_num = index_name.charAt(index_name.length-1);
        
        if ($(this).val() == 'is in the range') {
            enableAndShowExtraField(criteria_value, index_num);
        } else {
            disableAndHideExtraField(criteria_value, index_num);
        }
    });
    
    setupUI();
    appendAddButton();
    removeButtonCheck();
}