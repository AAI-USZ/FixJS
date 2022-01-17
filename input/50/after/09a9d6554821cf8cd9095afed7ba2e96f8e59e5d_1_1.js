function(id, extras) {
            $id_input.val(id);
            $id_input.trigger('change', [extras]);
        }, {input_id: $id_input.attr('id')}