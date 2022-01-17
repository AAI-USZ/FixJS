function(approver, account, conn, channels,
                               dispatchOp, context) {
        let channel = channels[0];
        let chanType = channel.get_channel_type();

        if (Shell.is_channel_invalidated(channel)) {
            Shell.decline_dispatch_op(context, 'Channel is invalidated');
            return;
        }

        if (chanType == Tp.IFACE_CHANNEL_TYPE_TEXT)
            this._approveTextChannel(account, conn, channel, dispatchOp, context);
        else if (chanType == Tp.IFACE_CHANNEL_TYPE_CALL)
            this._approveCall(account, conn, channel, dispatchOp, context);
        else if (chanType == Tp.IFACE_CHANNEL_TYPE_FILE_TRANSFER)
            this._approveFileTransfer(account, conn, channel, dispatchOp, context);
        else
            Shell.decline_dispatch_op(context, 'Unsupported channel type');
    }