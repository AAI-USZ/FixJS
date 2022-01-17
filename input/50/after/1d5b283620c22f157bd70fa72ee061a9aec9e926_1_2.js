function () {
                $('.project-slide' + notActivElem[1]).fadeOut(function () {
//                    $('.project-slide' + notActivElem[2]).fadeOut(function () {
                        $('.project-slide' + notActivElem[2]).fadeIn();
                        changeContentHeight();
                    });
//                });
            }