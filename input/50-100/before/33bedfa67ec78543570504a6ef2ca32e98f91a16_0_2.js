function() {
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
    }