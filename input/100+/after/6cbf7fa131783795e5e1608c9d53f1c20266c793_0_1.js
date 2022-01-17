function(data, textStatus) {
                if (textStatus == 'success') {
                    if (data.responseCode == 200) {
                        $('.notice-success').html(data.notice).slideDown('slow').delay(3000).slideUp('slow', function(){button.removeAttr('disabled');});
                    } else {
                        $('.notice-error').html(data.notice).slideDown('slow').delay(3000).slideUp('slow', function(){button.removeAttr('disabled');});
                    }
                }
            }