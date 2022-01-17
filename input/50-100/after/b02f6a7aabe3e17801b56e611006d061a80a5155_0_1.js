function() {
       var o = $(this).parents('.box');
       $.ajax({
           url: "/",
           type: "DELETE",
           data: {
             id: o.data('id'),
           },
       }).success(function() {
           o.fadeOut('slow');
       });
    }