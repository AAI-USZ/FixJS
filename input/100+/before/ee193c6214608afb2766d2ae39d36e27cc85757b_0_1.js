function(){
        $.getJSON(
        $(this).attr('href'),
        function(data){
            if(data.compact_mode == false){
                $('body').removeClass('compact');
            } else {
                $('body').addClass('compact');
            }
            resetLayout();
        });
        return false;
    }