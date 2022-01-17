function(){
        if ($(this).val() == 'is in the range') {
            var criteria_value = $(this).next(),
                index_name = criteria_value.attr('id'),
                index_num = index_name.charAt(index_name.length-1);
            
            criteria_value.after($('<input type="text" class="input_text">')
                          .attr('id', 'sp_criteria_extra_'+index_num)
                          .attr('name', 'sp_criteria_extra_'+index_num)).after(' to ');
        
        }	
    }