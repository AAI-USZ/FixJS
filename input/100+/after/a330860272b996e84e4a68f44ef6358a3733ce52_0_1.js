function(){
        $("#step2 select").remove();

        var $step2div = $("#step2 div");
        $step2div.each(function(){
            var $selectid = $(this).attr("id") + "select";
            var $inputArray = $('input', $(this));
            $(this).append("<select name='"+ $selectid +"' id='"+$selectid+"'></select>");
            $inputArray.each(function(){
              var $inputid = $(this).attr("value");
                var $select = $("select", $(this).parent());
                var $selectname = $inputid.replace(/session\d{1}/, "");
                $select.append("<option value='"+$inputid+"'>"+ $selectname+"</option>");
            });
        });
    }