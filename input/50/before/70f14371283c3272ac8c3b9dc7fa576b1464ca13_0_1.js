function (event) {
            $(this).closest('tr').find('td').each(function (index, value) {
                $(value).find('a[redirect-link=true] div').addClass('hover');
            });
        }