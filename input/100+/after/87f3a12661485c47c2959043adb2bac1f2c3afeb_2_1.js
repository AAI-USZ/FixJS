function () {

        self.bubbles.add ($('#id-name'), $('div.guess-case.bubble'));
        self.bubbles.add ($('#help-cta'), $('div.help-cta'));
        self.bubbles.add ($('#open-ac'), $('div.artist-credit'));
        self.bubbles.add ($('#id-packaging_id'), $('div.packaging'));
        self.bubbles.add ($('#id-barcode'), $('div.barcode'));
        self.bubbles.add ($('#id-annotation'), $('div.annotation'));
        self.bubbles.add ($('#id-comment'), $('div.comment'));

        MB.Control.GuessCase ('release', $('#id-name'));

        $('#id-various_artists').bind ('change.mb', function () {
            if ($(this).is(':checked'))
            {
                self.variousArtistsChecked ();
            }
        });

        if ($('div.artist-credit-box:eq(0) input.gid').val () ===
            MB.constants.VARTIST_GID)
        {
            $('#id-various_artists').attr ('checked', 'checked');
        }

        $('div.release-label').each (function () {
            self.addLabel ($(this));
        });

        $('#id-barcode').live ('change', function () {
            var barcode = $(this).val ().replace (/[^0-9]/g, '');
            $(this).val (barcode);
        });

        $('a[href=#add_label]').bind ('click.mb', function (event) {
            self.addLabel ();
            self.bubbles.hideAll ();
            event.preventDefault ();
        });

        self.artistcredit = MB.Control.ArtistCreditVertical (
            $('input#release-artist'), $('div.artist-credit'), $('input#open-ac')
        );
    }