function($) {
    "use strict";

    // GENERAL
    $('.dropdown-toggle').dropdown();

    // FOOTER
    $('#footer .btn-group .btn:not(.disabled)').on('click', function() {
        var $this = $(this);
        window.location = $this.data('href');
    }).each(function() {
        var $this = $(this);

        $this.tooltip({
            placement: 'top',
            title: $this.data('href')
        })
    });

    $('#content h5[id]').each(function() {
        var $this = $(this);

        $this.on('click', function() {
            var $this = $(this);

            window.location.hash = $this.attr('id');
        })
    });
}