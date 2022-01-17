function(){
        var code = $(this).prev();
        code = $('<a />').html(code).text();
        editAreaLoader.setValue("textarea_1", '<?php '+code);
        $("#code-php-button").click();
        //my_save("",'<?php '+code+'?>');
    }