function(evt){
                mouseOverSignIn = false;
                $(topnavUserLoginButton).trigger("mouseout");
                $("html").trigger("click");

                if ($(this).attr("id") === "topnavigation_search_input") {
                // Search binding (don't fire on following keyup codes: shift)
                    $(this).keyup();
                    if ($.trim($("#topnavigation_search_input").val())) {
                        $("#topnavigation_search_results").show();
                    }
                }
            }