function (sources){

            $("#deviceSelector").change(function(){
                $("#channelSelector")[0] = 0;
                $("#channelSelector").html("");
                var i = $("#deviceSelector")[0].selectedIndex;
                for (var j = 0; j < sources[i].channels.length; j++){
                    $("#channelSelector").append("<option>" + sources[i].channels[j].name + "</option>");
                    if (sources[i].channels[j].name == widgetSettings.channelName)
                        $("#channelSelector")[0].selectedIndex = j;
                }
            });
            for (var i = 0; i < sources.length; i++){
                $("#deviceSelector").append("<option>" + sources[i].name + "</option>");
                if (sources[i].name == widgetSettings.deviceName){
                    $("#deviceSelector")[0].selectedIndex = i;
                    $("#deviceSelector").change();
                }
            }
            $("#deviceSelector").enable();
            $("#channelSelector").enable();
        }