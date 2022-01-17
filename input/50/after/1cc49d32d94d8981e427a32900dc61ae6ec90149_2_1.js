function () {
            $(this).closest('tr').addClass('removeMe');
            selected_dbs[selected_dbs.length] = 'DROP DATABASE `' + escapeHtml($(this).val()) + '`;';
        }