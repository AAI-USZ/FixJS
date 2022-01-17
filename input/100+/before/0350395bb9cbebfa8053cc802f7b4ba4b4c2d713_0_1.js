function (playerId) {
        // parse deeplinks
        PODLOVE.playercount    = $('.mediaelementjs_player_container').length
        PODLOVE.ref_deep_links = [];
        PODLOVE.ref_deep_links = window.location.href.match(/((\d\d:)?\d\d:\d\d(\.\d\d\d)?)/) || [];
        PODLOVE.ref_deep_links.splice(1,1);
        $(PODLOVE.ref_deep_links).each(function (i, e) {
            PODLOVE.ref_deep_links[i] = PODLOVE.chapters.parseTimecode(e);
        });

        if (PODLOVE.ref_deep_links.length && PODLOVE.playercount === 1) {
            $('#' + playerId).attr('preload', 'auto');
            $('#' + playerId).attr('autoplay', 'autoplay');
        }

        MediaElement(playerId, {
            success: function (player) {
                PODLOVE.chapters.addBehaviour_chapter(playerId, player);
                PODLOVE.chapters.addBehaviour_deep_linking(playerId, player);
                if (PODLOVE.ref_deep_links.length && PODLOVE.playercount === 1) {
                    window.setTimeout(
                        function () {
                            $('html, body').animate({scrollTop: $('.mediaelementjs_player_container:first').offset().top - 25});
                        }, 150);
                }
            }
        });
    }