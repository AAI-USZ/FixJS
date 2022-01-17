function() {
    $("#add_new_tid").live('click', function() {
        if($('#tracking_id').attr('value') == '') {
            alert('Нужен номер трекинга');
        } else {
            $.ajax({
                url: "/",
                type: "POST",
                data: {
                    tid: $('#tracking_id').attr('value'),
                },
            }).success(function(d) {
                $('.warehouse').prepend(d).show();
                $('h2').fadeOut('fast');
            });
        }
    });
    
    $(".box .close").live('click', function() {
       var o = $(this).parents('.box');
       $.ajax({
           url: "/delete",
           type: "POST",
           data: {
             id: o.data('id'),
           },
       }).success(function() {
           o.fadeOut('slow');
       });
    });
    
    $(".box .refresh").live('click', function() {
       var o = $(this).parents('.box');
       $.ajax({
           url: "/update",
           type: "POST",
           data: {
             id: o.data('id'),
           },
       }).success(function(d) {
           o.fadeOut('fast', function() { $(d).hide(); o.replaceWith(d); o.fadeIn('slow');});
       });
    });
    
    
    $("#update_all_tid").live('click', function() {
        $.ajax({
            url: "/update",
            type: "POST",
        }).success(function() {
            window.reload();
        }).fail(function(e,b) {
            alert('Error: ' + e.status);
        });
    });
}