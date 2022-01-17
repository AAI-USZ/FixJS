function getServerData(){
            $.ajax({url: options.sourceDomain + "api/live-info/", 
                    data: {type:"endofday",limit: options.showLimit}, 
                    dataType: "jsonp", 
                    success:function(data) {
                        processData(data);
                    }, 
                    error: airtimeScheduleJsonpError});
            setTimeout(getServerData, options.updatePeriod*1000);
        }