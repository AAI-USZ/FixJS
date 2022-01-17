function () {
            var data = $(this).data("scrolloop"),
                i,
                n,
                totalwidth,
                speed = -data.d,

                toggle_offscreen = function (i) {
                    // hide the image if it's not visible, show otherwise
                    // safari mac has a weird webkit bug that makes this necessary

                    var img = $(data.img[i]);

                    if (data.arrleft[i] < -img.outerWidth() ||
                            data.arrleft[i] > $(this).outerWidth() + img.outerWidth()) {

                        img.hide();
                    } else {

                        img.show();
                    }
                };

            speed *= data.multiplier;

            if (data.stopping) {
                // speed down
                data.d /= 1.1;
            }

            if (speed < 0) {

                for (i = 0; i < data.img.length; i += 1) {
                    data.pos[i] += speed;

                    if (data.pos[i] <= -$(data.img[i]).outerWidth()) {

                        totalwidth = 0;

                        for (n = 0; n < data.img.length; n += 1) {
                            if (n !== i) {
                                totalwidth += $(data.img[n]).outerWidth();
                            }
                        }

                        data.pos[i] = totalwidth + data.pos[i] + $(data.img[i]).outerWidth();
                    }
                    $(data.img[i]).css("left", data.pos[i]);
                    toggle_offscreen(i);
                }
            } else {

                for (i = data.img.length - 1; i > -1; i -= 1) {
                    data.pos[i] += speed;

                    if (data.pos[i] >= $(this).outerWidth()) {

                        totalwidth = 0;

                        for (n = 0; n < data.img.length; n += 1) {
                            totalwidth += $(data.img[n]).outerWidth();
                        }

                        data.pos[i] -= totalwidth;
                    }
                    $(data.img[i]).css("left", data.pos[i]);
                    toggle_offscreen(i);
                }
            }

            return $(this);
        }