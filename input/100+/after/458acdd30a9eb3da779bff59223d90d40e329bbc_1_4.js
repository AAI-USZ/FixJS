function postprocess() {
    $('a').removeClass('selected');
    $('a[href="' + current_highlight + '"]').addClass('selected');
    $('form.confirm').submit(function() {
            return confirm("Are you sure? This object cannot be recovered " +
                           "after deletion.");
        });
    $('div.section h2, div.section-hidden h2').click(function() {
            $(this).next().slideToggle(100);
            $(this).toggleClass("toggled");
        });
    $('label').map(function() {
            if ($(this).attr('for') == '') {
                var id = 'auto-label-' + Math.floor(Math.random()*1000000000);
                var input = $(this).parents('tr').first().find('input, select');
                if (input.attr('id') == '') {
                    $(this).attr('for', id);
                    input.attr('id', id);
                }
            }
        });
    $('#download-configuration').click(function() {
            var path = '/api/all-configuration?download=' +
                esc($('#download-filename').val());
            window.location = path;
            setTimeout('app.run()');
            return false;
        });
    $('.multifield input').live('blur', function() {
            update_multifields();
        });
    if (! user_administrator) {
        $('.administrator-only').remove();
    }
    update_multifields();
}