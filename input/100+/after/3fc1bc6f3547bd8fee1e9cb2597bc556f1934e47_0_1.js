function (e) {
            var target = $(e.target).closest("div.select2-container").get(0);
            if (target) {
                $(document).find("div.select2-container-active").each(function () {
                    if (this !== target) $(this).data("select2").blur();
                });
            } else {
                target = $(e.target).closest("div.select2-drop").get(0);
                $(document).find("div.select2-drop-active").each(function () {
                    if (this !== target) $(this).data("select2").blur();
                });
            }

            target=$(e.target);
            if ("LABEL" === e.target.tagName && target.attr("for").length > 0) {
                target = $("#"+target.attr("for"));
                target = target.data("select2");
                if (target !== undefined) { target.focus(); e.preventDefault();}
            }
        }