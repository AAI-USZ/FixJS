function () {
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
        }