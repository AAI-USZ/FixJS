function preFlight(formData, jqForm, options) {
    // jqForm is a jQuery object encapsulating the form element.  To access the
    // DOM element for the form do this:
    // var formElement = jqForm[0];
    var formID = $(jqForm[0]['form_id']).val();

    // here we could return false to prevent the form from being submitted;
    // returning anything other than false will allow the form submit to continue
    if ($('#form' + formID).valid()) {
        if ($('#form' + formID + ' .fileupload').length>0) {
            $('#form' + formID + ' .progress').show();
        }
        return true;
    } else {
        $('#form' + formID).validate( {
            errorElement: 'span'
        });
        return false;
    }
}