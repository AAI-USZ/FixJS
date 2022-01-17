function () {
            if (($(this).hasClass("add_filter") || $(this).hasClass("and_filter")) && $(this).children("input")[0].val() !== "") {
                positivevals.push( $(this).children("input")[0].val() );
            } else if ($(this).hasClass("not_filter") && $(this).children("input")[0].val() !== "") {
                negativevals.push( $(this).children("input")[0].val() );
            }
        }