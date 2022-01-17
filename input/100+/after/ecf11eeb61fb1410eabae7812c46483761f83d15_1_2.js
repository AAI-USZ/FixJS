function () {
        $(document).off('click', '#done').on('click', '#done', $.done);
        $(document).off('submit', 'form').on('submit', 'form', $.submit);
        $(document).off('click', '.btn-success').on('click', '.btn-success', $.track);
        $(document).off('hidden', '#modal-form').on('hidden', '#modal-form', $.reset_form);
    }