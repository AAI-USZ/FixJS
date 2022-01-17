function(html) {
                    // The next line solves the problem of the popup
                    // persisting due to aggressive mouse movement.
                    if (! on_a_link) { return; }
                    $("div.popup").show(speed);
                    $("div.popup").animate({
                        top: event.pageY-100,
                        left: 0,
                    }, speed);
                    $("div.popup").html(html);
                }