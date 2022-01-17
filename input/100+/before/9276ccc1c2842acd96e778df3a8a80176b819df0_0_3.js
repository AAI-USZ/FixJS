function () {
        if ($(window).height() > 640) {
            $('#more').hide();
            $('#explore').show();
            $('#groups').show();
            $('#account').show();
            $('#projects').show();
            $('#home').show();
        } else if ($(window).height() <= 640 && $(window).height() > 540) {
            $('#more').show();
            if (actual != "explore") {
                $('#explore').hide();
                $('#groups').show();
                $('#extra-explore').show();
                $('#extra-groups').hide();
            } else {
                $('#explore').show();
                $('#groups').hide();
                $('#dock .triangulo').animate({
                    translateY:294 + 'px'
                });
                $('#extra-explore').hide();
                $('#extra-groups').show();
            }
            $('#account').show();
            $('#projects').show();
            $('#home').show();
            $('#extra-option').css('top', '386px');
            $('#extra-account').hide();
            $('#extra-projects').hide();
            $('#extra-home').hide();
        } else if ($(window).height() <= 540 && $(window).height() > 440) {
            $('#more').show();
            if (actual != "explore" && actual != "groups") {
                $('#explore').hide();
                $('#groups').hide();
                $('#account').show();
                $('#extra-explore').show();
                $('#extra-groups').show();
                $('#extra-account').hide();
            } else {
                var alt = [$('#explore'), $('#groups')];
                for (var i in alt) {
                    alt[i].hide();
                    $('#extra-' + alt[i].attr('id')).show();
                }
                $('#' + actual).show();
                $('#extra-' + actual).hide();
                $('#account').hide();
                $('#extra-account').show();
                $('#dock .triangulo').animate({
                    translateY:196 + 'px'
                });
            }
            $('#projects').show();
            $('#home').show();
            $('#extra-option').css('top', '286px');
            $('#extra-projects').hide();
            $('#extra-home').hide();
        } else if ($(window).height() <= 440 && $(window).height() > 340) {
            $('#more').show();
            if (actual != "explore" && actual != "groups" && actual != "account") {
                $('#explore').hide();
                $('#groups').hide();
                $('#account').hide();
                $('#projects').show();
                $('#extra-explore').show();
                $('#extra-groups').show();
                $('#extra-account').show();
                $('#extra-projects').hide();
            } else {
                var alt = [$('#explore'), $('#groups'), $('#account')];
                for (var i in alt) {
                    alt[i].hide();
                    $('#extra-' + alt[i].attr('id')).show();
                }
                $('#' + actual).show();
                $('#extra-' + actual).hide();
                $('#projects').hide();
                $('#extra-projects').show();
                $('#dock .triangulo').animate({
                    translateY:98 + 'px'
                });
            }
            $('#home').show();
            $('#extra-option').css('top', '190px');
            $('#extra-home').hide();
        } else if ($(window).height() <= 340) {
            $('#more').show();
            if (actual != "explore" && actual != "groups" && actual != "account" && actual != "projects") {
                $('#explore').hide();
                $('#groups').hide();
                $('#account').hide();
                $('#projects').hide();
                $('#extra-explore').show();
                $('#extra-groups').show();
                $('#extra-account').show();
                $('#extra-projects').show();
                $('#home').show();
                $('#extra-home').hide();
            } else {
                var alt = [$('#explore'), $('#groups'), $('#account'), $('#projects')];
                for (var i in alt) {
                    alt[i].hide();
                    $('#extra-' + alt[i].attr('id')).show();
                }
                $('#' + actual).show();
                $('#extra-' + actual).hide();
                $('#home').hide();
                $('#extra-home').show();
                $('#dock .triangulo').animate({
                    translateY:0 + 'px'
                });
            }
            $('#extra-option').css('top', '92px');
        }
    }