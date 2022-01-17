function () {
        var ID = $(this).parents(".remote_setting").attr("id").split("feed_")[1];
        
        var positivevals = new Array();
        var negativevals = new Array();
        var sizelims = null;
        var quickexit = null;
        $(this).closest(".add_filter_div").children().each( function () {
            if (($(this).hasClass("add_filter") || $(this).hasClass("and_filter")) && $(this).children("input")[0].value !== "") {
                positivevals.push( $(this).children("input")[0].value );
            } else if ($(this).hasClass("not_filter") && $(this).children("input")[0].value !== "") {
                negativevals.push( $(this).children("input")[0].value );
            } else if ($(this).hasClass("size_filter")) {
                var lower = $(this).children("input")[0].value;
                var lowertype = $(this).children("select")[1].value;
                var upper = $(this).children("input")[1].value;
                var uppertype = $(this).children("select")[2].value;
                if (!(lower == "" && upper == "")) {
                    if (!sizelims) {
                        if (lower == "") {
                            lower = 0;
                        }
                        if (upper == "") {
                            upper = 0;
                        }
                        lower *= lowertype;
                        upper *= uppertype;
                        sizelims = new Array(lower, upper);
                    } else {
                        alert("More than one size limit has been specified, remove the second and try again");
                        quickexit = true;
                        return;
                    }
                }
            }
        });
        if (quickexit) {
            return false;
        }
        if (sizelims) {
            sizelims = sizelims.join("||||||");
        } else {
            sizelims = "";
        }
        if (positivevals.length == 0) {
            positivevals = "";
        } else {
            positivevals = positivevals.join("||||||");
        }
        if (negativevals.length == 0) {
            negativevals = "";
        } else {
            negativevals = negativevals.join("||||||");            
        }
        
        var name = $(this).closest(".remote_setting").attr("id").split("remote_settings_")[1];
        
        if (positivevals == "" && negativevals == "" && sizelims == "") {} else {
            var req = "request=add_rss_filter&ID=" + ID;
            req += "&positive=" + encodeURIComponent(positivevals);
            req += "&negative=" + encodeURIComponent(negativevals);
            req += "&sizelim=" + encodeURIComponent(sizelims);
            socket.send(req);
        }
    }