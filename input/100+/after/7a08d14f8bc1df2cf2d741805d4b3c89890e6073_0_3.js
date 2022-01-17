function () {
    $("div label").appendTo("#label");
    $("div from").appendTo("#from");
    $("div hastheword").appendTo("#hastheword");
    $("div doesnothavetheword").appendTo("#doesnothavetheword");
    $("div to").appendTo("#to");
    $("div subject").appendTo("#subject");
    $("div forwardto").appendTo("#forwardto");
    $("div shouldarchive").appendTo("#shouldarchive");
    $("div shouldstar").appendTo("#shouldstar");
    $("div shouldneverspam").appendTo("#shouldneverspam");
    $("div shouldalwaysmarkasimportant").appendTo("#shouldalwaysmarkasimportant");
    $("div shouldtrash").appendTo("#shouldtrash");

    $("label").click(function () {
        console.log($(this).html());

        hideBlock();

        var label = $(this).html();
        var attrib = $(this).attr("refid");
        $('*[refid="' + $(this).attr("refid") + '"]').css('opacity', 1);

        var cnt = 0;

        $.each($("label"), function (i, elem) {
            el = $(elem);

            if (/* el.attr("refid") != attrib && */ el.html() == label) {
                $('*[refid="' + el.attr("refid") + '"]').css('background-color', colorTable[cnt++]).css('opacity', 1);
                el.css('opacity', 1);
            } else {
                el.css('opacity', 0);
            }
        });

        if ($(this).parent().hasClass("close")) {
            $(this).parent().removeClass("close");
            $("*").css('background-color', "white").css('opacity', 1);
            $('textarea#edit').hide();
        } else {
            $(this).parent().addClass("close");
        }
    });
    $("label").dblclick(function (event) {
        var id = $(this).attr("refid");
        var elems = $("*[refid='" + id + "']");
        var extension = "";
        $.each(elems, function (i, elem) {
            switch (elem.nodeName.toLowerCase()) {
                case 'label':
                    //alert(elem.nodeName.toLowerCase());
                    break;
                case "shouldarchive":
                case "shouldstar":
                case "shouldneverspam":
                case "shouldalwaysmarkasimportant":
                case "shouldtrash":
                    //alert(elem.nodeName.toLowerCase());
                    break;
                case 'hastheword':
                case 'doesnothavetheword':
                    extension += " " + encodeURI($(elem).html()) + "";
                    break
                default:
                    extension += elem.nodeName.toLowerCase() + ":(" + encodeURI($(elem).html().replace(/ /g,"+")).replace("?","%3F") + ") ";
            }
        });
        console.log(google_uri + extension);
        window.open(google_uri + extension);
    });
    $("from").click(editBlock);
    $("hastheword").click(editBlock);
    $("doesnothavetheword").click(editBlock);
    $("subject").click(editBlock);
    $("forwardto").click(editBlock);
}