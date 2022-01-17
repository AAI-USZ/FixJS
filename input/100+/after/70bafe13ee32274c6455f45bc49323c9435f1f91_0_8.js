function (e) {
    var reply = $.parseJSON(e.data);
    var content = reply.content;
    var msg_type = reply.header.msg_type;
    var header = reply.header;
    var callbacks = this.get_callbacks_for_msg(reply.parent_header.msg_id);
    if (msg_type !== 'status' && callbacks === undefined) {
        // Message not from one of this notebook's cells and there are no
        // callbacks to handle it.
        return;
    }
    var output_types = ['stream','display_data','pyout','pyerr','extension'];
    if ($.inArray(msg_type, output_types) >= 0) {
        var cb = callbacks['output'];
        if (cb !== undefined) {
            cb(msg_type, content, header);
        }
    } else if (msg_type === 'status') {
        if (content.execution_state === 'busy') {
            $([IPython.events]).trigger('status_busy.Kernel', this.kernel_id);
        } else if (content.execution_state === 'idle') {
            $([IPython.events]).trigger('status_idle.Kernel', this.kernel_id);
        } else if (content.execution_state === 'dead') {
            this.stop_channels();
            $([IPython.events]).trigger('status_dead.Kernel', this.kernel_id);
        };
    } else if (msg_type === 'clear_output') {
        var cb = callbacks['clear_output'];
        if (cb !== undefined) {
            cb(content, header);
        }
    };
}