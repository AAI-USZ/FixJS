function populateModifierSelect(e) {
    var criteria = $(e).val(),
        criteria_type = criteriaTypes[criteria],
        div = $(e);
    
    $(e).next().children().remove();

    if (criteria_type == 's') {
        $.each(stringCriteriaOptions, function(key, value){
            div.next().append($('<option></option>')
                      .attr('value', key)
                      .text(value));
        });
    } else {
        $.each(numericCriteriaOptions, function(key, value){
            div.next().append($('<option></option>')
                      .attr('value', key)
                      .text(value));
        });
    }
}