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

    $('#content').find('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function() {
        var $this = $(this);

        $this.on('click', function() {
            var $this = $(this);

            window.location.hash = $this.attr('id');
        })
    });
}