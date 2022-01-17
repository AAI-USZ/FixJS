function(toolbarSel, textareaSel, options) {
        var defaults = {
            cannedResponses: false,
            privateMessaging: false
        };

        var settings = $.extend({}, defaults, options);

        var SB = Marky.SimpleButton;
        var buttons = [
            new SB(gettext('Bold'), "'''", "'''", gettext('bold text'),
                   'btn-bold'),
            new SB(gettext('Italic'), "''", "''", gettext('italic text'),
                   'btn-italic'),
            new Marky.Separator(),
            new Marky.LinkButton(),
            new Marky.Separator(),
            new SB(gettext('Numbered List'), '# ', '',
                   gettext('Numbered list item'), 'btn-ol', true),
            new SB(gettext('Bulleted List'), '* ', '',
                   gettext('Bulleted list item'), 'btn-ul', true)
        ];
        if (settings.cannedResponses) {
            buttons.push(new Marky.Separator(),
                         new Marky.CannedResponsesButton());
        }
        if(settings.privateMessaging) {
            buttons.push(new Marky.Separator(),
                         new Marky.QuoteButton());
        }

        Marky.createCustomToolbar(toolbarSel, textareaSel, buttons);
    }