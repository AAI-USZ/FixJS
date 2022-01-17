function () {
        var method, tmp;

        $('#blast').on('sequence_type_changed database_type_changed',
            function (event) {
                  tmp = determine_blast_method();

                  if (tmp != method) {
                      method = tmp;

                      //notify listeners
                      $(this).trigger('blast_method_changed', [method]);
                  }
            });
    }