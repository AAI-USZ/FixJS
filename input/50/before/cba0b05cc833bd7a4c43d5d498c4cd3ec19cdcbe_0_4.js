function () {
            tmp = type_of_databases();

            if (tmp != type) {
                type = tmp;

                //notify listeners
                $(this).trigger('database_type_changed', type);
            }
        }