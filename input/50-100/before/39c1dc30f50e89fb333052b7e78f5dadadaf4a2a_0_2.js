function(event) {
            $.ajax(event.currentTarget.children[1].href, {
                success: function(html) {
                    on_a_link = true;
                    $("div.popup").show(speed);
                    $("div.popup").animate({
                        top: event.pageY-100,
                        left: 0,
                    }, speed);
                    $("div.popup").html(html);
                },
            });
        }