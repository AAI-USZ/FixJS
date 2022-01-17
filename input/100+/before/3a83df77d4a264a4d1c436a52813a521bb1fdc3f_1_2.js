function () {
    ///<summary> 
    ///to focus on the main text box when the user presses enter or presses the add button and when the page is ready 
    ///if empty return false esle return true 
    /// <para></para>
    ///
    ///</summary>
    addedNum();
    $('.header .searcharea .searchbox .searchinput').focus();


    $("input[name='option']").change(function () {
        $('.header .searcharea .searchbox .searchinput').focus();
        if ($("input[name='option']:checked").val() == 'QA') {
            $(".header .searcharea .searchbox .addbutton").fadeOut(200);
            $(".header .searcharea .addedEntitiesBox ").fadeOut(200, function () {
                $(".header .searcharea .addedEntitiesBox .title").text("");
            });
        }
        else if ($("input[name='option']:checked").val() == 'compare') {
            if ($(".header .searcharea .addedEntitiesBox .title").html() != "compare between") {
                $(".header .searcharea .searchbox .addbutton").fadeIn(200);

                $(".header .searcharea .addedEntitiesBox .title").fadeOut(200, function () {
                    $(".header .searcharea .addedEntitiesBox .title").text("Compare between");
                    $(".header .searcharea .addedEntitiesBox").fadeIn(200);
                    $(".header .searcharea .addedEntitiesBox .title").fadeIn(200);
                });
            }
        }
        else if ($("input[name='option']:checked").val() == 'relate') {
            if ($(".header .searcharea .addedEntitiesBox .title").html() != "Relate between") {
                $(".header .searcharea .searchbox .addbutton").fadeIn();
                $(".header .searcharea .addedEntitiesBox").fadeIn();
                $(".header .searcharea .addedEntitiesBox .title").fadeOut(200, function () {
                    $(".header .searcharea .addedEntitiesBox .title").text("Relate between");
                    $(".header .searcharea .addedEntitiesBox .title").fadeIn(200);
                });
            }
        }
    });

    ///<summary> 
    ///changes the opacity if the add button when the main text bow is empty or not
    ///</summary>

    $(".header .searcharea .searchbox .addbutton").css("opacity", ".3");
    $(".header .searcharea .searchbox .searchinput").keyup(function () {
        if (!enable() || stopadd()) {
            $(".header .searcharea .searchbox .addbutton").css("opacity", ".3");
        }
        else {
            $(".header .searcharea .searchbox .addbutton").css("opacity", "1");
        }
    });



    $(".header .searcharea .searchbox .addbutton").click(function () {
        addObject();
        $(".header .searcharea .searchbox .addbutton").css("opacity", ".3");
        $('.header .searcharea .searchbox .searchinput').focus();
        return false;
    });

    ///<summary> 
    ///starts the search process when the user clicks on the search button
    ///if empty return false esle return true 
    /// 
    ///
    ///</summary>

    $(".header .searcharea .searchbox .searchbutton").click(function () {

        if (enable() && $("input[name='option']:checked").val() == 'QA')
        { searchBegin(); }
        else if ($("input[name='option']:checked").val() != 'QA') {
            searchBegin();
        }

        return false;
    });

    ///<summary> 
    ///to start the search when the user presses enter and adds new objects to addedEntitiesBox when the user presses enter
    ///if empty return false esle return true 
    /// 
    ///
    ///</summary>


    $('.header .searcharea .searchbox .searchinput').bind('keypress', function (e) {                // Enter pressed... do anything here...
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            if ($("input[name='option']:checked").val() != 'QA') {
                addObject();
            }
            if ($("input[name='option']:checked").val() == 'QA') {
                if (enable())
                { searchBegin(); }
            }

            return false;
        }
    });
}