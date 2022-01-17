function(account, conn, channels, notify) {
        let len = channels.length;
        for (let i = 0; i < len; i++) {
            let channel = channels[i];

            // We can only handle text channel, so close any other channel
            if (!(channel instanceof Tp.TextChannel)) {
                channel.close_async(null);
                continue;
            }

            // 'notify' will be true when coming from an actual HandleChannels
            // call, and not when from a successful Claim call. The point is
            // we don't want to notify for a channel we just claimed which
            // has no new messages (for example, a new channel which only has
            // a delivery notification). We rely on _displayPendingMessages()
            // and _messageReceived() to notify for new messages.

            // But we should still notify from HandleChannels because the
            // Telepathy spec states that handlers must foreground channels
            // in HandleChannels calls which are already being handled.

            if (notify && this._tpClient.is_handling_channel(channel)) {
                // We are already handling the channel, display the source
                let source = this._chatSources[channel.get_object_path()];
                if (source)
                    source.notify();
            }
        }
    }