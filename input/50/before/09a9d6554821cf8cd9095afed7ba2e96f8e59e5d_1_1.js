function(id, extras) {
            $id_input.val(id);
            $id_input.trigger('change', [extras]);
        }