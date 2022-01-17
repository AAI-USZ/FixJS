function() {
        var lh = MakonFMp.SUB_LINE_HEIGHT = $('.subtitles').css('lineHeight').replace(/\D+/g, '');
        var lc = MakonFMp.SUB_LINE_CNT = Math.round($('.subtitles').height() / lh);
        MakonFMp.SUB_MIDDLE_LINE = Math.floor((lc+1) / 2) - 1;

        MakonFM.jPlayer = function(a,b) { $('#jquery_jplayer_1').jPlayer(a,b); };
        MakonFM.jPlayer({
            swfPath: MakonFM.STATIC_BASE,
            supplied: "mp3",
            timeupdate: function(evt) {
                if (MakonFM.editation_active()) return;
                try {
                    MakonFM.upd_sub(evt.jPlayer.status.currentTime, MakonFM.subs);  // XXX
                } catch(e) {
                    ;;; console.log(e);
                }
                MakonFM.player_time(evt.jPlayer.status.currentTime);
            },
            ready: function() {
                if (location.hash.length > 1) {
                    var fn = location.hash.substr(1);
                    MakonFM.current_file(fn);
                }
            }
        });
        MakonFM.jp = $('#jquery_jplayer_1').data('jPlayer');

        ko.applyBindings(MakonFM);

        $('input.js-set-name').val( $.cookie('author') );
    }