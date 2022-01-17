function(observer, account, conn, channels,
                               dispatchOp, requests, context) {
        let len = channels.length;
        for (let i = 0; i < len; i++) {
            let channel = channels[i];
            let [targetHandle, targetHandleType] = channel.get_handle();

            /* Only observe contact text channels */
            if ((!(channel instanceof Tp.TextChannel)) ||
               targetHandleType != Tp.HandleType.CONTACT)
               continue;

            this._createChatSource(account, conn, channel, channel.get_target_contact());
        }

        context.accept();
    }