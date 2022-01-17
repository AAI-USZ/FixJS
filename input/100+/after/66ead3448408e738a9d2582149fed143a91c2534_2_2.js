function(msgEvt) {
  var data = msgEvt.getBrowserEvent().data;

  if (!goog.isString(data)) {
    return false;
  }

  var headDelim = data.indexOf('|');
  var serviceDelim = data.indexOf(':');

  // make sure we got something reasonable
  if (headDelim == -1 || serviceDelim == -1) {
    return false;
  }

  var channelName = data.substring(0, headDelim);
  var service = data.substring(headDelim + 1, serviceDelim);
  var payload = data.substring(serviceDelim + 1);

  goog.net.xpc.logger.fine('messageReceived: channel=' + channelName +
                           ', service=' + service + ', payload=' + payload);

  // Attempt to deliver message to the channel. Keep in mind that it may not
  // exist for several reasons, including but not limited to:
  //  - a malformed message
  //  - the channel simply has not been created
  //  - channel was created in a different namespace
  //  - message was sent to the wrong window
  //  - channel has become stale (e.g. caching iframes and back clicks)
  var channel = goog.net.xpc.channels_[channelName];
  if (channel) {
    channel.deliver_(service, payload, msgEvt.getBrowserEvent().origin);
    return true;
  }

  var transportMessageType =
      goog.net.xpc.NativeMessagingTransport.parseTransportPayload_(payload)[0];

  // Check if there are any stale channel names that can be updated.
  for (var staleChannelName in goog.net.xpc.channels_) {
    var staleChannel = goog.net.xpc.channels_[staleChannelName];
    if (staleChannel.getRole() == goog.net.xpc.CrossPageChannelRole.INNER &&
        !staleChannel.isConnected() &&
        service == goog.net.xpc.TRANSPORT_SERVICE_ &&
        (transportMessageType == goog.net.xpc.SETUP ||
        transportMessageType == goog.net.xpc.SETUP_NTPV2)) {
      // Inner peer received SETUP message but channel names did not match.
      // Start using the channel name sent from outer peer. The channel name
      // of the inner peer can easily become out of date, as iframe's and their
      // JS state get cached in many browsers upon page reload or history
      // navigation (particularly Firefox 1.5+). We can trust the outer peer,
      // since we only accept postMessage messages from the same hostname that
      // originally setup the channel.
      goog.net.xpc.logger.fine('changing channel name to ' + channelName);
      staleChannel.name = channelName;
      // Remove old stale pointer to channel.
      delete goog.net.xpc.channels_[staleChannelName];
      // Create fresh pointer to channel.
      goog.net.xpc.channels_[channelName] = staleChannel;
      staleChannel.deliver_(service, payload);
      return true;
    }
  }

  // Failed to find a channel to deliver this message to, so simply ignore it.
  goog.net.xpc.logger.info('channel name mismatch; message ignored"');
  return false;
}