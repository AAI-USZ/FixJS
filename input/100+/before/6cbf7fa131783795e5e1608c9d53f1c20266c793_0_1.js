function(data, textStatus) {
                $('.notice-success').html(data.notice).slideDown('slow').delay(3000).slideUp('slow');
            }