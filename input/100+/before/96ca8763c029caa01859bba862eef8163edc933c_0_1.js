function(index) {
        if ($(this).attr('id').length >0) {
            var formid = $(this).attr('id');
            var uploads = $(this).find('.fileupload');
            var options = {
                target:        '#' + formid + 'message',   // target element(s) to be updated with server response
                beforeSubmit:  preFlight,  // pre-submit callback
                uploadProgress: function(event, position, total, percentComplete) {
                    if (uploads.length>0) {
                        var percentVal = percentComplete + '%';
                        $('#' + formid + ' .progress .bar').width(percentVal)
                        $('#' + formid + ' .progress .percent').html(percentVal);
                    }
                },
                success:       showResponse,  // post-submit callback
                url:       'json/jojo_contact_send.php',        // override for form's 'action' attribute
                //type:      type        // 'get' or 'post', override for form's 'method' attribute
                dataType:  'json',        // 'xml', 'script', or 'json' (expected server response type)
                //clearForm: true        // clear all form fields after successful submit
                //resetForm: true        // reset the form after successful submit

                // $.ajax options can be used here too, for example:
                error: function(){
                    $('#' + formid + 'message').show().html('There has been a failure to communicate. Your request has been stored however and will be attended to shortly');
                }
            };
            $('#' + formid).validate({
             errorElement: 'span',
             submitHandler: function(form) {
               $('#'+ formid).ajaxSubmit(options);
             }
            });
        }
        if ($(this).attr('id').length >0 && $("fieldset", this).length>1 && $(this).hasClass('multipage')) {
            setFormTabs($(this).attr('id'));
        }
        return false;
    }