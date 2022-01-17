function(){
        if ($(".field").val() === "Name") {
            $( ".query" ).autocomplete({
                source: '/search/auto/' + $(".field").val(),
                minLength: 3
            });
        }else {
            $( ".query" ).autocomplete({
                source: '/search/auto/' + $(".field").val(),
                minLength: 1
            });
        }
      
    }