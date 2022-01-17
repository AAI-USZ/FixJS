function(options) {

    var defaults = {
        updatePeriod: 20, //seconds
        sourceDomain: "http://localhost/", //where to get show status from
        text: {onAirToday:"On air today"},
        showLimit: 5
    };
    options = $.extend(true, defaults, options);
    options.sourceDomain = addEndingBackslash(options.sourceDomain);

    return this.each(function() {
        var obj = $(this);
        var sd;

        getServerData();

        function updateWidget(){
            var currentShow = sd.getCurrentShow();
            var nextShows = sd.getNextShows();
            var shows = currentShow.length == 0 ? nextShows : currentShow.concat(nextShows);

            tableString = "";
            tableString += "<h3>" + options.text.onAirToday + "</h3>";
            tableString += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='widget widget now-playing-list small'>"+
                "<tbody>";
            
            for (var i=0; i<shows.length; i++){
                tableString +=
                "<tr>" +
                "<td class='time'>"+shows[i].getRange()+"</td>";

                var url = shows[i].getURL();
                if (url.length > 0) {
                    tableString += "<td><a href='" + shows[i].getURL() + "'>" + shows[i].getName() + "</a></td></tr>";
                } else {
                    tableString += "<td>" + shows[i].getName() + "</td></tr>";
                }  
            }
            tableString += "</tbody></table>";
            
            obj.empty();
            obj.append(tableString);
        }

        function processData(data){
            checkWidgetVersion(data);
            sd = new ScheduleData(data);
            updateWidget();
        }

        function airtimeScheduleJsonpError(jqXHR, textStatus, errorThrown){
        }

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
    });
 }