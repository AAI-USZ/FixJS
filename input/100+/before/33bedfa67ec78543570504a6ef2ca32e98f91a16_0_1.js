function() {
    $('#add_new_tid').click(function() {
        if($('#tracking_id').attr('value') == '') {
            alert('Нужен номер трекинга');
        } else {
            $.ajax({
                url: "/",
                type: "POST",
                data: {
                    tid: $('#tracking_id').attr('value'),
                },
            }).success(function(data) {
                $('.warehouse').fadeIn('slow').append(data);
                $('h2').fadeOut('fast');
            });
        }
    });
    
    $('.close').click(function() {
       obj = $(this).parents('.box');
       $.ajax({
           url: "/",
           type: "DELETE",
           data: {
             id: $(this).data('id')
           },
       }).success(function() {
           obj.fadeOut('slow');
       });
    });
}