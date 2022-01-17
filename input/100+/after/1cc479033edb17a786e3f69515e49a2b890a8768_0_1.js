function(e){
        if (e.which == '13') {
            e.preventDefault();
        }
        if ($(this).val().length > 0) {
            $(settings.selector).hide();
            var criteria = $(this).val();
            var element = "div:icontains('"+criteria+"')";
            $(element).show();
            if (parseInt($(element).size()) == 0) {
                if (settings.emptyMsgHolder != '') {
                    $(settings.emptyMsgHolder).html(settings.emptyMsg);
                } else {
                    $('#simplesearch_not_found_text').remove();
                    $(settings.selector).parent().append('<p id="simplesearch_not_found_text" align="center">'+settings.emptyMsg+'</p>');
                }
            } else {
                $('#simplesearch_not_found_text').remove();
            }
        } else {
            $(settings.selector).show();
        }
    }