function (sources){
            for (var i = 0; i < sources.length; i++){
                $("#deviceSelector").append("<option>" + sources[i].name + "</option>");
                if (sources[i].name == widgetSettings.deviceName){
                    $("#deviceSelector")[0].selectedIndex = i;
                    for (var j = 0; j < sources[i].channels.length; j++){
                        $("#channelSelector").append("<option>" + sources[i].channels[j].name + "</option>");
                        if (sources[i].channels[j].name == widgetSettings.channelName)
                            $("#channelSelector")[0].selectedIndex = j;
                    }
                }
            }
            $("#deviceSelector").enable();
            $("#channelSelector").enable();
        }