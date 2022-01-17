function () {
            tmp = type_of_sequences();

            if (tmp !== type) {
                type = tmp;

                //notify listeners
                $(this).trigger('sequence_type_changed', type);
            }
        }