function(e){
            e.preventDefault();

            var button = $(this);
            button.attr('disabled', 'disabled');

            var url = $('#confirm-guests-form').attr("action");
            var data = $('#confirm-guests-form').serialize();
            $.post(url, data, function(data, textStatus) {
                if (textStatus == 'success') {
                    if (data.responseCode == 200) {
                        $('.notice-success').html(data.notice).slideDown('slow').delay(3000).slideUp('slow', function(){button.removeAttr('disabled');});
                    } else {
                        $('.notice-error').html(data.notice).slideDown('slow').delay(3000).slideUp('slow', function(){button.removeAttr('disabled');});
                    }
                }
            });
        }