function () {
        $("#step2 div").css("display", "none");
        $("input:checkbox:checked").each(function(){
            console.log($(this).attr("value"));
            if($(this).attr("value") == "group1 session1"){
                $("#step2session1").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session2"){
                $("#step2session2").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session3"){
                $("#step2session3").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session4"){
                $("#step2session4").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session5"){
                $("#step2session5").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session6"){
                $("#step2session6").css("display", "block");
            }
        });
    }