function update_subject_category(current_select, option){
        current_select.val(option);
        var tr = current_select.parent("td").parent("tr");
        // var subject_category = td.find("#id_subject_category");
        
        if(option == 1|option == 2){
            tr.attr("class", "accepted");
        }
        else if(option == 0){
            tr.attr("class", "");
        }
        else{
            tr.attr("class", "denied");
        }
    }