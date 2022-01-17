function () {
            selected_dbs[selected_dbs.length] = 'DROP DATABASE `' + escapeHtml($(this).val()) + '`;';
        }