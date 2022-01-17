function () {
            var data = $(this).data("scrolloop"),
                i,
                n,
                totalwidth,
                speed = -data.d;

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
                }
            }

            return $(this);
        }