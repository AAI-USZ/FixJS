function() {
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
    }