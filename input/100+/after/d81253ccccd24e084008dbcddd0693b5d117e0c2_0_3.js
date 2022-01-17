function(){
        var index_name = $(this).attr('id'),
            index_num = index_name.charAt(index_name.length-1);
        if ($('#sp_criteria_extra_'+index_num).length > 0) {
            $('#sp_criteria_extra_'+index_num).remove();
            $('#sp_criteria_extra_label_'+index_num).remove();
        }
        populateModifierSelect(this);
    }