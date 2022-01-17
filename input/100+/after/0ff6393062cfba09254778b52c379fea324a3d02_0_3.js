function (e) {
                e.preventDefault();
                $(this)
                    .closest('.ui-dialog')
                    .find('.ui-dialog-buttonpane .ui-button')
                    .first()
                    .click();
            }