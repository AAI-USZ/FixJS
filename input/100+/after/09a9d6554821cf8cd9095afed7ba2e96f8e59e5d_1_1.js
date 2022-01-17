function click_live_handler() {
        // Look for the corresponding content type input and target id input
        var $id_input = $( '#' + this.id.replace(/^lookup_/, '') );
        var $ct_input = get_corresponding_input($id_input);
        if ($ct_input.length == 0) {
            return false;
        }
        var ct_id = $ct_input.val();
        NewmanLib.debug_ct_input = $ct_input;
        if ( ! ct_id ) {
            $ct_input
            .addClass('highlighted')
            .focus()
            .change(function(){$(this).removeClass('highlighted')});
            return false;
        }
        var content_type = id2ct(ct_id);
        open_overlay(content_type, function(id, extras) {
            $id_input.val(id);
            $id_input.trigger('change', [extras]);
        }, {input_id: $id_input.attr('id')});
        return false;
    }