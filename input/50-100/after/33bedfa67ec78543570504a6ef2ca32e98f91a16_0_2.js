function() {
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
    }