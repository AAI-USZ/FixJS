function () {
        debugger;
        if ($(this).children("span").length > 7) {

            var links = $(this).children("span");
            var hidden = "<div class='hidden' style='display:none;'>" + $(this).html() + "</div>";

            $(this).empty();
            $(this).append(links.slice(0, 7));
            $(this).append(hidden);

            if (!$(obj).hasClass("contracted")) {
                $(obj).children(".predicate").children(".expand").remove();
                $(obj).children(".predicate").append("<a class=\"expand\" href=\"#\" onclick=\"expand($(this).parent().parent()) ;return false;\">[+]</a>");
                $(obj).addClass("contracted");
            }

        }

        else if ($(this).children("span").length == 1 && $(this).children("span").text().length > 300) {

            var text = $(this).children("span").text();
            var hidden = "<div class='hidden' style='display:none;'><span>" + text + "</span></div>";
            $(this).empty();

            $(this).append("<span>" + getFirstWords(300, text) + "</span>")

            //adding class contracted to the comparison box check that it's not added before
            if (!$(obj).hasClass("contracted")) {
                $(obj).children(".predicate").children(".expand").remove();
                $(obj).children(".predicate").append("<a class=\"expand\" href=\"#\" onclick=\"expand($(this).parent().parent()) ;return false;\">[+]</a>");
                $(obj).addClass("contracted");
            }

            $(this).append(hidden);
        }

    }