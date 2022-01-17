function (event) {
        var id = $(this).attr("refid");
        var elem = $("from[refid='" + id + "']");
        console.log(id);
        if (!elem.attr("reset")) {
            elem.attr("reset", elem.html());
        }
        console.log(elem.html() + "\r\n" + $(event.target).html());


        $('textarea#edit').val($(event.target).html());
        $('textarea#edit').show();
        $('textarea#edit').css('top', event.pageY);// $(this).position().top + 30);
        $('textarea#edit').css('left', event.pageX);//$(this).position().left);
        $('textarea#edit').unbind('keyup');
        $('textarea#edit').focus();

        console.log("Top:  " + $('textarea#edit').position().top);
        console.log("Left: " + $('textarea#edit').position().left);

//        elem.keyup(function () {
        //$('textarea#edit').val(elem.html().replace(/\n/g, '<br/>'));
        //$('textarea#edit').val($(this).html()); // also not working as expected
//        });
        $('textarea#edit').keyup(function () {
            $("from[refid='" + id + "']").html($('textarea#edit').val());
            $("from[refid='" + id + "']").addClass("edited");
        });
        $('textarea#edit').focusout(function () {
            console.log("hide textarea");
            $('textarea#edit').hide();
            //$('textarea#edit').val(" ");
            var elem = $("from[refid='" + id + "']");
            if (elem.html() == elem.attr("reset"))
                elem.removeClass("edited");
            else
                elem.addClass("edited");
        });
    }