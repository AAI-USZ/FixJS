function(){
        var details = $('#item-details').fadeOut(0);

        if ($('#item-type-project:checked').val()){
            details.fadeIn();
        }
        $('#item-type-box').click(function(){
            details.fadeOut();
            $("#wiki-url").val("");
            $("#freetext").val("");
        });

        $('#item-type-project').click(function(){
            details.fadeIn();
        });
    }