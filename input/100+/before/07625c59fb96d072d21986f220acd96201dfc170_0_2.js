function () {
        var inputval = $(this).parent().next().val();
        var positivevals = new Array();
        var negativevals = new Array();
        $(this).closest(".add_filter_div").children().each( function () {
            if (($(this).hasClass("add_filter") || $(this).hasClass("and_filter")) && $(this).children("input")[0].val() !== "") {
                positivevals.push( $(this).children("input")[0].val() );
            } else if ($(this).hasClass("not_filter") && $(this).children("input")[0].val() !== "") {
                negativevals.push( $(this).children("input")[0].val() );
            }
        });
        console.log("positivevals:", positivevals);
        console.log("negativevals:", negativevals);
        
        
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        console.log("name:", name);
        
        //if (inputval) {
        //    socket.send("request=add_filter&name=" + name + "&restring=" + encodeURIComponent(inputval));
        //}
    }