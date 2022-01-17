function (event) {
            tmp = determine_blast_method();

            if (tmp !== method) {
                method = tmp;

                //notify listeners
                $(this).trigger('blast_method_changed', [method]);
            }
        }