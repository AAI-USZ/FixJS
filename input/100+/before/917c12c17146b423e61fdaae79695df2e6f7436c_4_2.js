function () {
        var ID = $(this).parents(".remote_setting").attr("id").split("feed_")[1];
        //var newf = $(this).parent().next();
        //var newfval = newf.val()
        //if (!newfval) {
        //    newf.focus();
        //    return false;
        //}
        //socket.send("request=add_rss_filter&ID=" + ID + "&restring=" + encodeURIComponent(newfval));
        
        var positivevals = new Array();
        var negativevals = new Array();
        $(this).closest(".add_filter_div").children().each( function () {
            if (($(this).hasClass("add_filter") || $(this).hasClass("and_filter")) && $(this).children("input")[0].value !== "") {
                positivevals.push( $(this).children("input")[0].value );
            } else if ($(this).hasClass("not_filter") && $(this).children("input")[0].value !== "") {
                negativevals.push( $(this).children("input")[0].value );
            }
        });
        positivevals = positivevals.join("||||||");
        negativevals = negativevals.join("||||||");
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        
        if (positivevals !== "") {
            socket.send("request=add_rss_filter&ID=" + ID + "&positive=" + encodeURIComponent(positivevals) + "&negative=" + encodeURIComponent(negativevals));
        }
    }