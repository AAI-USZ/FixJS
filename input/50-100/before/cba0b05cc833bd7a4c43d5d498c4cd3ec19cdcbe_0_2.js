function () {
        var type = type_of_databases(), tmp;

        $('.databases input').change(function () {
            tmp = type_of_databases();

            if (tmp != type) {
                type = tmp;

                //notify listeners
                $(this).trigger('database_type_changed', type);
            }
        });
    }