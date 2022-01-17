function () {
            console.log("hide textarea");
            $('textarea#edit').hide();
            $('textarea#edit').val(" ");
            var elem = $("from[refid='" + id + "']");
            if(elem.html() == elem.attr("reset"))
                elem.removeClass("edited");
            else
                elem.addClass("edited");
        }