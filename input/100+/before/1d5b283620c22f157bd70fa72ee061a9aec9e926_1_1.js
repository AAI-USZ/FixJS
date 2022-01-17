function () {
    var elemsTab = ["before-civikey", "virtual-keyboard", "contributors", "partners"];
    var notActivElem = [1, 2, 3, 0];
    changeContentHeight();

    $('.project-menuelem').click(function () {
        clickedElem = $(this);
        changeContent(clickedElem);
    });

    function changeContent(clickedElem) {
        if (changeActiveElem(clickedElem)) {
            detectNotActivElem(clickedElem);
            $('.project-slide' + notActivElem[0]).fadeOut(function () {
                $('.project-slide' + notActivElem[1]).fadeOut(function () {
                    $('.project-slide' + notActivElem[2]).fadeOut(function () {
                        $('.project-slide' + notActivElem[3]).fadeIn();
                        changeContentHeight();
                    });
                });
            });
        }
    }

    function detectNotActivElem(activeElem) {
        var j = 0;
        for (var i = 0; i < elemsTab.length; i++) {
            if (clickedElem.attr('id') != elemsTab[i]) {
                notActivElem[j] = i;
                j++;
            } else {
                notActivElem[notActivElem.length - 1] = i;
            }
        }
    }

    function changeActiveElem(clickedElem) {

        if (!clickedElem.hasClass('active-proj')) {
            $('.project-menuelem').removeClass('active-proj');
            $('.project-menuelem').addClass('inactive');
            clickedElem.removeClass('inactive');
            clickedElem.addClass('active-proj');
            return true;
        } else {
            return false;
        }
    }

    function changeContentHeight() {
        var shadowHeight = $('.project-shadow').height();
        var content = $('.project-leftblock-content').height();
        var height;
        if (content != 0) {
            $('.project-slider').height(content + 30);
            $('.project-shadow').css('top', content + 50);
        }
    }

    $('.carousel').carousel({
        interval: 2000
    });
    $('.carousel').carousel('pause');
}