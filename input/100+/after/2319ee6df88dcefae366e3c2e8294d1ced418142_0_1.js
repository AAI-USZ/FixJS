function(e, $promos) {
        hideHomePromo();
        $promos.slideDown('slow')
               .append('<a href="#" class="control prev">&laquo;</a>\
                        <a href="#" class="control next">&raquo;</a>');
        $('div', $promos).zCarousel({
            circular: true,
            btnPrev: $('.prev', $promos),
            btnNext: $('.next', $promos)
        });
        $('.addons h3', $promos).truncate({dir: 'h'});
        $('.addons .desc', $promos).truncate({dir: 'v'});
        $('.install', $promos).installButton();
        var $disabled = $('.disabled, .concealed', $promos);
        if ($disabled.length) {
            $disabled.closest('.wrap').addClass('hide-install');
        }
        $('#monthly .blurb > p').lineclamp(4);
        $('.ryff .desc').lineclamp(6);
        $('h2:not(.multiline)', $promos).linefit();
    }