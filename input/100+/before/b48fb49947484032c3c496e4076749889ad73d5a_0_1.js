function(){
        var curr = $(this).parent();
        var curr_pos = curr.index();
        var list = curr.parent();
        var list_length = list.find("div:visible").length;
        var count = list_length - curr_pos;
        var next = curr.next();
        var add_button = form.find('a[id="criteria_add"]');
        
        //remove error message from current row, if any
        var error_element = curr.find('span[class="sp-errors"]');
        if (error_element.is(':visible')) {
            error_element.remove();
            curr.find('span[id="sp-errors"]').remove();
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
            	/*next.find('[name^="sp_criteria_extra"]').remove();
                next.find('span[id="sp_criteria_extra_label"]').remove();*/
                
            
            /* if only the current row has the extra criteria value,
             * then just remove the current row's extra criteria element
             */
            } else if (curr.find('[name^="sp_criteria_extra"]').attr("disabled") != "disabled"
                       && next.find('[name^="sp_criteria_extra"]').attr("disabled") == "disabled") {
                disableAndHideExtraField(curr.find(':first-child'), index);
                /*curr.find('[name^="sp_criteria_extra"]').remove();
                curr.find('span[id="sp_criteria_extra_label"]').remove();*/
                
            /* if only the next row has the extra criteria value,
             * then add the extra criteria element to current row
             * and assign next row's value to it
             */
            } else if (next.find('[name^="sp_criteria_extra"]').attr("disabled") != "disabled") {
                criteria_extra = next.find('[name^="sp_criteria_extra"]').val();
                enableAndShowExtraField(curr.find(':first-child'), index);
                /*curr.find('[name^="sp_criteria_value"]')
                    .after($('<input type="text" class="input_text">')
                    .attr('id', 'sp_criteria_extra_'+index_num)
                    .attr('name', 'sp_criteria_extra_'+index_num)).after('<span id="sp_criteria_extra_label"> to </span>');*/
                curr.find('[name^="sp_criteria_extra"]').val(criteria_extra);
            }

            curr = next;
            next = curr.next();
        }
		
        list.find('div:visible:last').children().attr('disabled', 'disabled');
        list.find("div:visible:last")
            .find('[name^="sp_criteria"]').val(0).end()
            .find('[name^="sp_criteria_modifier"]').val(0).end()
            .find('[name^="sp_criteria_value"]').val('')
            .end().hide();

        list.next().show();
        
        // always put 'add' button on the last row
        if (list.find('div:visible').length > 1) {
            list.find('div:visible:last').find('a[id^="criteria_remove"]').after(add_button);
        } else {
            list.find('div:visible:last').find('[name^="sp_criteria_value"]').after(add_button);
        }
    }