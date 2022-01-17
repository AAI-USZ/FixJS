function () {
                            if(!invertHoverEffect) {
                                $(this).children('.ieFix').stop(true, true).fadeOut();
                            } else {
                                $(this).children('.ieFix').stop(true, true).fadeIn();
                            }
                        }