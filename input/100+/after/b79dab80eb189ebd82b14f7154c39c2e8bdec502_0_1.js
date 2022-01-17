function() {
// Init sort tables
$(".tablesorter").tablesorter({sortList: [[0, 0]]});

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


$('#step2-submit').click(function() {

    // how many "duplicatable" input fields we currently have.
    var num     = $('.ticket_type').length-1;
    // the numeric ID of the new input field being added.
    var newNum  = new Number(num + 1);

    // create the new element via clone(), and manipulate it's ID using newNum value.
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
            .end(); 

    // insert the new element after the last "duplicatable" field
    $('#fieldset-' + num).after(newElem);
    return false; 
});

}