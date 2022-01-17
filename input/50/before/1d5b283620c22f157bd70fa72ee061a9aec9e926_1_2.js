function () {
                    $('.project-slide' + notActivElem[2]).fadeOut(function () {
                        $('.project-slide' + notActivElem[3]).fadeIn();
                        changeContentHeight();
                    });
                }