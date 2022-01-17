function() {
    // quick edit button
    $('.js-quick-edit').button({
        icons: {
            primary: "ui-icon-pencil"
        }
    }).click(function(event) {
        event.preventDefault();

        var button = $(this),
        url = button.attr('href'),
        field = $("#" + button.attr('rel')),
        initalHeight = field.height() + 100;

        // load form
        field.load(url, function() {
            field.find('label').remove();
            field.find('textarea').css('height', initalHeight);
        });

        // change to save button
        button.replaceWith('  <a href="http://sv.wikipedia.org/wiki/Textile" class="js-help" target="_blank">Hjälp</a><a href="' + url + '" class="js-quick-save" rel="profile-description">Spara</a>');
        $('.js-quick-save').button({
            icons: {
                primary: "ui-icon-pencil"
            }
        }).click(function(event) {
            event.preventDefault();
            field.find('form').submit();
        });

        $('.js-help').button({
            icons: {
                primary: "ui-icon-help"
            }
        }).parent().buttonset();
        return false;
    });

    $('#switcher').themeswitcher();
}