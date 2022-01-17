function connectorToggled(connectorName,objectTypeNames,enabled){
        for (var i = 0; i < digest.selectedConnectors.length; i++){
            if (connectorName == digest.selectedConnectors[i].connectorName){
                var channels = digest.selectedConnectors[i].channelNames;
                for (var i = 0; i < channels.length; i++){
                    var channel = getSourceChannelByFullName(channels[i]);
                    var channelMapping = sourcesMap[channel.id]
                    if (enabled)
                        addChannel(channelMapping,null);
                    else
                        $("._timeline_channel_" + channelMapping.device_name + "_" + channelMapping.channel_name + "_delete_btn").click();

                }
                return;
            }
        }
    }