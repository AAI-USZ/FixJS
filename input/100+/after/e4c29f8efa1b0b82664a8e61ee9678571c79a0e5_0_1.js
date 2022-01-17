function() {
    // Init sort tables
    $(".tablesorter").tablesorter({sortList: [[0, 0]]});

    //
    //
    // START: Create/Edit Event Form
    //
    //

    $('.date-pick').datetimepicker({
        dateFormat: 'yy-mm-dd',
        minDate: getFormattedDate(new Date())
    });

    function getFormattedDate(date){
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear().toString().slice(2);
        return day + '-' + month + '-' + year;
    }

    // Create ticket type fieldsets
    $('#step2-submit').livequery('click',function() {
        
        // Find and determine the highest id-number
        var target = $('.ticket_type').last().attr("id");
        //Get position of the first '-'
        var pos = target.indexOf('-');
        //Split the string.
        var num = target.substring(pos + 1);
        // the numeric ID of the new input field being added.
        var newNum  = Number(num) + Number(1);
        // create the new element via clone(), and manipulate it's ID and names using newNum value.
        // Also remove error messages from the cloned form.
        var newElem = $('#fieldset-' + num).clone().attr('id', 'fieldset-' + newNum);
        newElem
            .find('.errors').html('')
            .end()
            .find('.name')
                .val('')
                .attr('id', 'step2-' + newNum + '-name')
                .attr('name', 'step2[' + newNum+'][name]')
                .end()
            .find(".quantity")
                .val('')
                .attr('id', 'step2-' + newNum + '-quantity')
                .attr('name', 'step2[' + newNum+'][quantity]')
                .end()
            .find(".price")
                .val('')
                .attr('id', 'step2-' + newNum + '-price')
                .attr('name', 'step2[' + newNum+'][price]')
                .end()
            .find(".details")
                .val('')
                .attr('id', 'step2-' + newNum + '-details')
                .attr('name', 'step2[' + newNum+'][details]')
                .end()
            .find(".order")
                .val(newNum)
                .attr('id', 'step2-' + newNum + '-order')
                .attr('name', 'step2[' + newNum+'][order]')
                .end()
            .find(".remove_ticket_type")
                .attr('id', 'step2-' + newNum + '-submit')
                .attr('name', 'step2[' + newNum+'][submit]')
                .end()                
            .find(".ticket_type")
                .attr('id', 'fieldset-' + newNum)
                .end()
            .find(".ticket_type_id")
                .attr('id', 'step2-' + newNum + '-ticket_type_id')
                .attr('name', 'step2[' + newNum+'][ticket_type_id]')
                .end();                 

        // insert the new element after the last "duplicatable" field
        $('#fieldset-' + num).after(newElem);
        
        // Enable remove-ticket-type-button if there is more then one ticket type subform showing
        var num = $('.remove_ticket_type').length;
        if (num > 1)
            $('.remove_ticket_type').removeAttr('disabled');
        
        // Disable submit
        return false; 
    });

    // Remove ticket type fieldset from form
    $('.remove_ticket_type').livequery('click',function() {

        // Get target id
        var target = $(this).attr("id");
        //Get position of the first '-'
        var pos = target.indexOf('-');
        //Split the string.
        var subOne = target.substring(pos + 1);
        //Get the position of the second '-'
        var pos = subOne.indexOf('-');
        //Split the string and get the number.
        var id  = subOne.substring(0,pos);
        // remove element       
        $('#fieldset-' + id).remove();
        
        // Disable remove-ticket-type-button if there is only one ticket type subform showing
        var num = $('.remove_ticket_type').length;
        if (num == 1)
            $('.remove_ticket_type').attr('disabled','disabled');
        
        // Disable submit
        return false;
    });

    // Disable remove-ticket-type-button if there is only one ticket type subform showing
    var num = $('.remove_ticket_type').length;
    if (num == 1)
        $('.remove_ticket_type').attr('disabled','disabled');
    
}